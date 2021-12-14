import { getRepository, Repository } from 'typeorm';
import ICurrencyRepository from 'src/modules/currency/repositories/ICurrencyRepository';
import { Currency } from '../entities/Currency';
import { format, getYear, getMonth, getDate } from 'date-fns';

export class CurrencyRepository implements ICurrencyRepository {
  private ormRepository: Repository<Currency>;

  constructor() {
    this.ormRepository = getRepository(Currency);
  }

  public async checkCurrency(date: Date, type: number): Promise<Currency> {
    // const day = date.toLocaleDateString().substring(0, 2);
    // const month = date.toLocaleDateString().substring(3, 5);
    // const year = date.toLocaleDateString().substring(6, 10);
    // const newDate = `${year}-${month}-${day}`;

    const newDate = format(
      new Date(getYear(date), getMonth(date), getDate(date)),
      'yyyy-MM-dd',
    );

    console.log(newDate);
    const foundedCurrency = await this.ormRepository.findOne({
      where: { dt_ctc: newDate, cd_moe: type },
    });

    return foundedCurrency;
  }
}
