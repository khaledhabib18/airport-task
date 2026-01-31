import { Field, ObjectType } from '@nestjs/graphql';
import { Flight } from '../flight.entity';

@ObjectType()
export class GetFlightsOutput {
  @Field(() => [Flight])
  data: Flight[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  limit: number;

  @Field()
  totalPages: number;
}
