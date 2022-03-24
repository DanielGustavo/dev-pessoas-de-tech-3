import { Authorized, Query, Resolver } from 'type-graphql';

import { CalculateMonthFinancesService } from '../../../services/CalculateMonthFinancesService';

import { MonthFinances } from './schema';

@Resolver(MonthFinances)
export class FinancesResolver {
  @Authorized()
  @Query(() => MonthFinances)
  async loadMonthFinances() {
    const calculateMonthFinancesService = new CalculateMonthFinancesService();

    const {
      monthConsts: costs,
      monthPayment: payment,
      profit,
    } = await calculateMonthFinancesService.execute();

    return { payment, costs, profit };
  }
}
