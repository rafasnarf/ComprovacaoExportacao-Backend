import { Currency } from '../infra/typeorm/entities/Currency';
import CurrencyDTO from '../dtos/CurrencyDTO';

export default interface ICurrencyRepository {
  checkCurrency(date: Date, type: number): Promise<Currency>;
}
