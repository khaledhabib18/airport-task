import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class BookFlightInput {
  @Field()
  @IsUUID()
  flightId: string;
}
