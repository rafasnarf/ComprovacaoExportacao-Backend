import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindByDateService } from './services/FindByDate.service';
import { FindByCenopService } from './services/FindByCenop.service';
import { FindByNrOperService } from './services/FindByNrOper.service';
import { FindByMciService } from './services/FindByMci.service';
import { FindByCnpjService } from './services/FindByCnpj.service';

import Operations from './infra/typeorm/entities/Operations';
import OperationsController from './infra/http/controllers/operations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Operations])],
  providers: [
    FindByDateService,
    FindByCenopService,
    FindByNrOperService,
    FindByMciService,
    FindByCnpjService,
  ],
  controllers: [OperationsController],
  exports: [TypeOrmModule],
})
export default class OperationsModule {}
