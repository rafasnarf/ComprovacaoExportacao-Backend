import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import OperationsModule from './modules/operations/operations.module';
import { ManualConfirmationModule } from './modules/manualconfirmation/manualConfirmation.module';
import { DueModule } from './modules/due/due.module';

import ormconfig = require('./config/ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig[0]),
    OperationsModule,
    ManualConfirmationModule,
    DueModule,
  ],
})
export default class AppModule {}
