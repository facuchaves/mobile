const { parallel, series, src, dest } = require('gulp')
const tar = require('gulp-tar')
const gzip = require('gulp-gzip')
const deployer = require('nexus-deployer')

const minimist = require('minimist')

const knownOptions = {
  string: 'branch',
}

const options = minimist(process.argv.slice(2), knownOptions)

if (!options.branch) {
  throw new Error('No --branch parameter supplied')
}

const { version } = require('./package.json')

const versionType = options.branch === 'master' ? 'RELEASE' : 'SNAPSHOT'
const fullVersion = `${version + (options.branch === 'master' ? '' : `-${options.branch}`)}-${versionType}`
const repository = `${versionType.toLowerCase()}s`
const groupId = 'com.navent.jobs.portal'

const artifacts = [
  {
    artifactId: 'backend',
    packagePath: 'packages/jobs',
    src: [
      'packages/backend-for-frontend/dist/**/*',
      'packages/backend-for-frontend/package.json',
      'packages/backend-for-frontend/.npmrc',
    ],
  },
  {
    artifactId: 'frontend-semanas',
    packagePath: 'packages/semanas',
    src: ['packages/semanas/dist/**/*'],
  },
  {
    artifactId: 'frontend-postulantes',
    packagePath: 'packages/postulantes',
    src: ['packages/postulantes/dist/**/*'],
  },
]

function createPackageTask(artifactId, packagePath, packageSrc) {
  return () => {
    console.log(`Packaging ${artifactId}`)
    return src(packageSrc)
      .pipe(tar(`${artifactId}.tar`))
      .pipe(gzip())
      .pipe(dest(`${packagePath}/output/package`))
  }
}

function createPublishTask(artifactId, packagePath) {
  return callback => {
    return deployer.deploy(
      {
        groupId,
        artifactId,
        version: fullVersion,
        packaging: 'tar.gz',
        auth: {
          username: 'deployment',
          password: 'n4v3ntd3v',
        },
        pomDir: `${packagePath}/output/pom`,
        url: `http://nexus.deployment-manager.jobs.navent.biz:8080/nexus/content/repositories/${repository}`,
        artifact: `${packagePath}/output/package/${artifactId}.tar.gz`,
        cwd: '',
        insecure: true,
      },
      callback
    )
  }
}

const packageTask = parallel(artifacts.map(a => createPackageTask(a.artifactId, a.packagePath, a.src)))
const publishTask = series(packageTask, parallel(artifacts.map(a => createPublishTask(a.artifactId, a.packagePath))))

exports.publish = publishTask
exports.package = packageTask
