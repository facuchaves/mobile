import { Module } from '@nestjs/common'
import { FiltrosServices } from './filtros.service'
import { TraduccionesApiService } from '../../../traducciones-api/traducciones-api.service'
import { CoreApiService } from '../../../core-api/core-api.service'
import { ApplicationCoreApiModule } from '../../../application-core-api/application-core-api.module'
import { StaticEntitiesModule } from '../../../static-entities/static-entities.module'

/* Filtros */
import { FiltroAreaFactory } from './filtro.area.factory'
import { FiltroAreaFactoryImpl } from './filtro.area.factory.impl'
import { FiltroSubareaFactory } from './filtro.subarea.factory'
import { FiltroSubareaFactoryImpl } from './filtro.subarea.factory.impl'
import { FiltroLocalizacionFactory } from './filtro.localizacion.factory'
import { FiltroLocalizacionFactoryImpl } from './filtro.localizacion.factory.impl'

@Module({
  imports: [ApplicationCoreApiModule, StaticEntitiesModule],
  providers: [
    FiltrosServices,
    FiltroAreaFactory,
    FiltroAreaFactoryImpl,
    FiltroSubareaFactory,
    FiltroSubareaFactoryImpl,
    FiltroLocalizacionFactory,
    FiltroLocalizacionFactoryImpl,
    TraduccionesApiService,
    CoreApiService,
  ],
})
export class FiltrosServicesModule {}
