import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from './config.service'

const service = new ConfigService('test.env')

describe('ConfigService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
