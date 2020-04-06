import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { readFileSync, existsSync } from 'fs'

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string }

  constructor(filePath: string) {
    this.envConfig = existsSync(filePath) ? dotenv.parse(readFileSync(filePath)) : {}
  }

  get(key: string): string {
    return process.env[key] ? process.env[key] : this.envConfig[key]
  }

  getJwtSecret() {
    return this.get('JWT_SECRET')
  }
}
