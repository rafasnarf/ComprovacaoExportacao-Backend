import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../infra/typeorm/entities/Currency';
import { CurrencyRepository } from '../infra/typeorm/repositories/CurrencyRepositories';
import CurrencyDTO from '../dtos/CurrencyDTO';

@Injectable()
export class CheckCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: CurrencyRepository,
  ) {}

  async execute(date: Date, type: number): Promise<CurrencyDTO> {
    const foundedCurrency = await this.currencyRepository.checkCurrency(
      date,
      type,
    );

    const currency: CurrencyDTO = {
      cdMoeda: foundedCurrency.cd_moe,
      nomeMoeda: foundedCurrency.nm_moeda,
      dataCotacao: foundedCurrency.dt_ctc,
      valorCotacao: foundedCurrency.vlr_cpr_br,
    };

    return currency;
  }
}
