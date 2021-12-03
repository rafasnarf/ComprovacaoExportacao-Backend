import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Currency } from '../infra/typeorm/entities/Currency';
import FakeCurrencyRepository from '../repositories/fakes/FakeCurrencyRepository';
import { CheckCurrencyService } from './CheckCurrency.service';

describe('CheckCurrencyService', () => {
  let service: CheckCurrencyService;
  let currencyRepository: FakeCurrencyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckCurrencyService,
        {
          provide: getRepositoryToken(Currency),
          useClass: FakeCurrencyRepository,
        },
      ],
    }).compile();

    service = await module.resolve(CheckCurrencyService);
    currencyRepository = await module.resolve(getRepositoryToken(Currency));
  });

  it('should return a price of de Dollar in a specific day', async () => {
    const date = new Date('2021-11-18');
    const type = 220;

    const result = await service.execute(date, type);

    console.log(result);
  });
});
