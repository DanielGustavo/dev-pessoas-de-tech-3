import { IsIn, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType()
export class FilterStringField {
  @Field()
  @MinLength(1)
  @MaxLength(255)
  value: string;

  @Field()
  @IsIn(['=', '!='])
  operator: string;
}

@InputType()
export class FilterNumberField {
  @Field(() => Float)
  @MinLength(1)
  @MaxLength(255)
  value: number;

  @Field()
  @IsIn(['=', '>', '>=', '<', '<=', '!='])
  operator: string;
}

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  @Min(1)
  page: number;

  @Field(() => Int)
  @Min(1)
  @Max(30)
  take: number;
}
