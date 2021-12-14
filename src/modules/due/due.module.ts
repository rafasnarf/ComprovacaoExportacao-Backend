import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SaveDuesService } from './services/SaveDues.service';

import { RemoveDueService } from './services/RemoveDues.service';

import { AlterDueService } from './services/AlterDue.service';

import { FindAllDuesFromOperationService } from './services/FindAllDuesFromOperation.service';

import { DueController } from './infra/http/controllers/due.controller';

import DUEs from './infra/typeorm/entities/DUEs';
import Operations from '../operations/infra/typeorm/entities/Operations';
import { Currency } from '../currency/infra/typeorm/entities/Currency';

@Module({
  imports: [TypeOrmModule.forFeature([DUEs, Operations, Currency])],

  providers: [
    SaveDuesService,
    RemoveDueService,
    FindAllDuesFromOperationService,
    AlterDueService,
  ],

  controllers: [DueController],

  exports: [TypeOrmModule],
})
export class DueModule {}
