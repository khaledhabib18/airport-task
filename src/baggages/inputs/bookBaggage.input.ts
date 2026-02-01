import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class BookBaggageInput {
  @Field()
  @IsNumber()
  weight: number;

  @Field()
  @IsUUID()
  airportId: string;

  @Field()
  @IsUUID()
  flightId: string;
}
