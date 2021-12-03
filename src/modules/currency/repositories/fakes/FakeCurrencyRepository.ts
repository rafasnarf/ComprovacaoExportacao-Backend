import ICurrencyRepository from '../ICurrencyRepository';
import { Currency } from '../../infra/typeorm/entities/Currency';

export default class FakeCurrencyRepository implements ICurrencyRepository {
  private currency: Currency[] = [
    {
      dt_ctc: new Date('2021-11-18'),
      cd_moe: 220,
      nm_moeda: 'DOLAR DOS ESTADOS UNIDOS',
      vlr_cpr_br: 5.5464,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-18'),
      cd_moe: 470,
      nm_moeda: 'IEN JAPONES',
      vlr_cpr_br: 0.04852,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-18'),
      cd_moe: 540,
      nm_moeda: 'LIBRA ESTERLINA',
      vlr_cpr_br: 7.4738,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-18'),
      cd_moe: 978,
      nm_moeda: 'EURO',
      vlr_cpr_br: 6.2935,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-17'),
      cd_moe: 978,
      nm_moeda: 'EURO',
      vlr_cpr_br: 6.2174,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-17'),
      cd_moe: 540,
      nm_moeda: 'LIBRA ESTERLINA',
      vlr_cpr_br: 7.4029,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-17'),
      cd_moe: 470,
      nm_moeda: 'IEN JAPONES',
      vlr_cpr_br: 0.04801,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
    {
      dt_ctc: new Date('2021-11-17'),
      cd_moe: 220,
      nm_moeda: 'DOLAR DOS ESTADOS UNIDOS',
      vlr_cpr_br: 5.4987,
      dt_hr_atu_ctc: new Date(),
      dt_hr_atu_tbl: new Date(),
      vlr_cpr_usd: 0,
      vlr_vnd_br: 0,
      vlr_vnd_usd: 0,
    },
  ];

  public async checkCurrency(date: Date, type: number): Promise<Currency> {
    const dateFilter = Object.keys(this.currency)
      .filter(key => this.currency[key].dt_ctc.valueOf() === date.valueOf())
      .reduce((obj, key) => {
        obj[key] = this.currency[key];
        return obj;
      }, {});

    const foundedCurrency = Object.keys(dateFilter)
      .filter(key => this.currency[key].cd_moe === type)
      .reduce((obj, key) => {
        obj[key] = this.currency[key];
        return obj;
      }, {});

    const currency: Currency = {
      dt_ctc: foundedCurrency[0].dt_ctc,
      cd_moe: foundedCurrency[0].cd_moe,
      nm_moeda: foundedCurrency[0].nm_moeda,
      vlr_cpr_br: foundedCurrency[0].vlr_cpr_br,
      dt_hr_atu_ctc: foundedCurrency[0].dt_hr_atu_ctc,
      dt_hr_atu_tbl: foundedCurrency[0].dt_hr_atu_tbl,
      vlr_cpr_usd: foundedCurrency[0].vlr_cpr_usd,
      vlr_vnd_br: foundedCurrency[0].vlr_vnd_br,
      vlr_vnd_usd: foundedCurrency[0].vlr_vnd_usd,
    };

    return currency;
  }
}
