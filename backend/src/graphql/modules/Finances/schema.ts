import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class MonthFinances {
  @Field(() => Float)
  payment: number;

  @Field(() => Float)
  costs: number;

  @Field(() => Float)
  profit: number;
}
