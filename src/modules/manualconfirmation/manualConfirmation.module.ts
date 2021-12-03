import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ComprovacaoManual from './infra/typeorm/entities/ComprovocaoManual';
import { FindConfirmationByNrOperService } from './services/FindConfirmationByNrOper.service';
import { SaveManualConfirmationService } from './services/SaveManualConfirmation.service';
import ManualConfirmationController from './infra/http/controllers/manualConfirmation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComprovacaoManual])],
  providers: [FindConfirmationByNrOperService, SaveManualConfirmationService],
  controllers: [ManualConfirmationController],
  exports: [TypeOrmModule],
})
export class ManualConfirmationModule {}
