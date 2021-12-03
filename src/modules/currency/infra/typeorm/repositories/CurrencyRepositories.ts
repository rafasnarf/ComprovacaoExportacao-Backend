import { getRepository, Repository } from 'typeorm';
import ICurrencyRepository from 'src/modules/currency/repositories/ICurrencyRepository';
import { Currency } from '../entities/Currency';

export class CurrencyRepository implements ICurrencyRepository {
  private ormRepository: Repository<Currency>;

  constructor() {
    this.ormRepository = getRepository(Currency);
  }

  public async checkCurrency(date: Date, type: number): Promise<Currency> {
    const foundedCurrency = await this.ormRepository.findOne({
      where: { dt_ctc: date, cd_moe: type },
    });

    return foundedCurrency;
  }
}
