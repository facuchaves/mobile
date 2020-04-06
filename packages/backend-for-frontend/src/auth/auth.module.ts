import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          // TODO: Por ahora JWT se usa solamente para la sesión
          // A futuro deberíamos pasarle este parámetro cuando firmamos el token
          expiresIn: 3600 * 24 * 30, // 30 dias
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
