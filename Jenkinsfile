@Library('jobs-jenkins-library')

import org.jenkinsci.plugins.pipeline.modeldefinition.Utils

String label = "jobs-portal-builder-${UUID.randomUUID().toString().substring(0, 8)}".toString()

String sonarqubeProjectKey = "jobs-portal"
String sonarqubeProjectName = "jobs-portal"

// Stop previous executions of the same branch (Except master)
jobExecution.stopPrevious()

podTemplate(cloud: 'jenkins-slaves-cluster',
        label: label,
        yaml: """
apiVersion: v1
kind: Pod
metadata:
  labels:
    pipeline: jobs-portal
    step: build
spec:
  nodeSelector:
    builders: "true"
  containers:
  - name: jnlp
    image: gcr.io/jobs-deployment-manager/navent/jobs/infra/nodejs10-slave:latest
    workingDir: /home/jenkins
    args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
    imagePullPolicy: Always
    resources:
      requests:
        cpu: 3000m
        memory: 4000Mi
  - name: redis
    image: redis:5
    resources:
      requests:
        cpu: 150m
        memory: 500Mi
"""
) {
    node(label) {
        stage('Checkout') {
            checkout scm

            env.VERSION = sh(returnStdout: true, script: "CI=true yarn version | grep -oP '(?<=Current version: )[^\\s]+(?=.*)' | tr -d '\\n'")
            env.VERSION_TYPE = env.BRANCH_NAME == "master" ? "RELEASE" : "SNAPSHOT"
            env.FULL_VERSION = "${env.VERSION}-${env.BRANCH_NAME != "master" ? env.BRANCH_NAME + "-" : ""}${env.VERSION_TYPE}"

            currentBuild.description = "${env.FULL_VERSION}"
        }

        stage('Compile') {
            github.withPRStatus(context: "compilation", targetUrl: env.BUILD_URL,
                    pendingDescription: 'Compilation pending',
                    successDescription: 'Code Compiles',
                    failDescription: 'Code compilation failed') {
                sh "yarn install"
                sh "yarn update-build-info"
                sh "yarn run build"
            }

            echo 'Code Compiles'
        }

        stage('Test') {
            try {
                github.withPRStatus(context: "test", targetUrl: "${env.BUILD_URL}testReport/",
                        pendingDescription: 'Test pending',
                        successDescription: 'Tests Pass',
                        failDescription: 'Test failed') {
                    sh "CI=true yarn run validate"
                }
            } finally {
                // Generar reporte de ejecución de test (las rutas de los resultados dependen del proyecto)
                junit(
                        testResults: '**/output/test/*.xml',
                        allowEmptyResults: true)

                // Generar reporte de cobertura de test (el plugin y las rutas de los resultados dependen del proyecto)
                step([
                        $class             : 'CoberturaPublisher',
                        autoUpdateHealth   : false,
                        autoUpdateStability: false,
                        coberturaReportFile: '**/output/coverage/*.xml',
                        failUnhealthy      : false,
                        failUnstable       : false,
                        maxNumberOfBuilds  : 0,
                        onlyStable         : false,
                        sourceEncoding     : 'ASCII',
                        zoomCoverageChart  : false
                ])
            }

            echo 'Tests Pass!'
        }

        stage('Quality') {
            catchError(buildResult: "SUCCESS", stageResult: "UNSTABLE", message: 'Bad Quality') {
                github.withPRStatus(context: "quality", targetUrl: "${env.SONARQUBE_URL}/dashboard?id=${sonarqubeProjectKey}&pullRequest=${env.CHANGE_ID}",
                        pendingDescription: 'Quality pending',
                        successDescription: 'Quality OK',
                        failDescription: 'Bad Quality') {
                    return sonarqube.analisys {
                        String params = sonarqube.analisysParams(projectKey: sonarqubeProjectKey,
                                projectName: sonarqubeProjectName, version: env.FULL_VERSION)
                        sh "yarn run sonarqube ${params}"
                    }
                }
            }

            echo 'Quality OK!'
        }

        stage('Publish') {
            if (env.CHANGE_ID || env.BRANCH_NAME == "master") {
                sh "yarn publishPackages --branch=${env.BRANCH_NAME}"
            } else {
                Utils.markStageSkippedForConditional('Publish')
            }
        }

        stage('Tag repository') {
            if (env.BRANCH_NAME == "master") {
                github.tagRepository(repository: "github.com/ITNavent/jobs-portal", tag: "${env.FULL_VERSION}", description: "Version ${env.FULL_VERSION}")
            } else {
                Utils.markStageSkippedForConditional('Tag repository')
            }
        }
    }
}


node("master") {
    stage('Publish docker images') {
        if (env.CHANGE_ID || env.BRANCH_NAME == "master") {
            parallel(
                    'Backend image': {
                        stage('Backend image') {
                            build job: "Portal/Jobs Portal/Backend - Image", parameters: [
                                    string(name: "REPOSITORY", value: "${env.VERSION_TYPE.toLowerCase()}s"),
                                    string(name: "VERSION", value: "${env.FULL_VERSION}")
                            ]
                        }
                    },
                    'Frontend Semanas image': {
                        stage('Frontend Semanas image') {
                            build job: "Portal/Jobs Portal/Frontend Semanas - Image", parameters: [
                                    string(name: "REPOSITORY", value: "${env.VERSION_TYPE.toLowerCase()}s"),
                                    string(name: "VERSION", value: "${env.FULL_VERSION}")
                            ]
                        }
                    },
                    'Frontend Postulantes image': {
                        stage('Frontend Postulantes image') {
                            build job: "Portal/Jobs Portal/Frontend Postulantes - Image", parameters: [
                                    string(name: "REPOSITORY", value: "${env.VERSION_TYPE.toLowerCase()}s"),
                                    string(name: "VERSION", value: "${env.FULL_VERSION}")
                            ]
                        }
                    })
        } else {
            Utils.markStageSkippedForConditional('Publish docker images')
        }
    }

    stage('Deploy to QA') {
        if (env.CHANGE_ID) {
            build job: "Portal/Jobs Portal/QA/Deploy", parameters: [
                    string(name: "VERSION", value: "${env.FULL_VERSION}"),
                    string(name: "IDENTIFIER", value: "${env.BRANCH_NAME}")
            ]
        } else {
            Utils.markStageSkippedForConditional('Deploy to QA')
        }
    }
}