import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getDate,
  isWeekend,
  previousDay,
  previousFriday,
  subDays,
} from 'date-fns';

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
    // let day: number;
    if (isWeekend(date)) {
      date.setDate(previousFriday(date).getDate());
    }
    // else {
    //   day = getDate(date);
    // }

    // const month = date.toLocaleDateString().substring(3, 5);
    // const year = date.toLocaleDateString().substring(6, 10);
    // const newDate = new Date(`${year}/${month}/${day}`);
    let founded = await this.getCurrency(date, type);

    if (!founded) {
      const catchDay = date.getDay();
      if (
        catchDay === 5 ||
        catchDay === 4 ||
        catchDay === 3 ||
        catchDay === 2
      ) {
        date.setDate(subDays(date, 1).getDate());
        // console.log(subDays(date, 1).getDate());
      } else if (catchDay === 1) {
        date.setDate(previousFriday(date).getDate());
      }

      founded = await this.getCurrency(date, type);
    }

    const currency: CurrencyDTO = {
      cdMoeda: founded.cd_moe,
      nomeMoeda: founded.nm_moeda,
      dataCotacao: founded.dt_ctc,
      valorCotacao: founded.vlr_cpr_br,
    };
    // console.log(currency);
    return currency;
  }

  private async getCurrency(date: Date, type: number): Promise<Currency> {
    const foundedCurrency = await this.currencyRepository.checkCurrency(
      date,
      type,
    );

    return foundedCurrency;
  }
}
