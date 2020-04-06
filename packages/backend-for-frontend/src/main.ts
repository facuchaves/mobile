require('newrelic')
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger as NestLogger } from '@nestjs/common'
import { nodeEnv, isDevelopment } from './config/config.module'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import cookieParser = require('cookie-parser')
import buildInfo from './build-info.json'

const PORT = 5000
const nestLogger = new NestLogger('Nest')

const corsOptions = {
  origin: ['http://localhost:3000', 'https://newprepro.bumeran.com.ar'], // boolean | string | RegExp | (string | RegExp)[] | CustomOrigin;
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // string | string[];
  preflightContinue: false, // boolean;
  optionsSuccessStatus: 204, //number;
  credentials: true, // boolean;
  allowedHeaders: 'X-NEW-ONE,Content-Type,x-site-id,*', // string | string[];
  // exposedHeaders?: string | string[];
  // maxAge?: number;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (isDevelopment) app.enableCors(corsOptions)
  app.setGlobalPrefix(nodeEnv === 'mobile' ? 'api-mobile' : 'api')
  const options = new DocumentBuilder()
    .setTitle('Node Api Server ')
    .setDescription('The nestJs API en ' + nodeEnv.toUpperCase())
    .setVersion(buildInfo.version)
    .setBasePath(nodeEnv === 'mobile' ? 'api-mobile' : 'api')
    .setHost('')
    .setSchemes('http', 'https')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(nodeEnv === 'mobile' ? 'api-mobile/swagger' : 'api/swagger', app, document)
  app.useLogger(nestLogger)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.use(cookieParser())
  await app.listen(PORT)
  nestLogger.log(`BFF listening on port ${PORT}`)
}
bootstrap()
