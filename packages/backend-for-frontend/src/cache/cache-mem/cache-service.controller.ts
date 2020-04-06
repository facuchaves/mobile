import { Controller, Get, Delete, Param } from '@nestjs/common'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import CacheService from '../../cache/cache-mem/cache-service'

@ApiUseTags('server-utils')
@ApiResponse({
  status: 200,
  description: 'The record has been successfully.',
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Controller('cache-service')
export class CacheServiceController {
  @Get('/cache/:key')
  async cache(@Param('key') key: string): Promise<any> {
    return await CacheService.getCachedValue(key)
  }

  @Delete('/cache')
  async caches() {
    return await CacheService.clearCache()
  }
}
