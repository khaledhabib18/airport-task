import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateFlightInput {
  @Field()
  @IsString()
  flightNumber: string;

  @Field()
  @IsString()
  departureAirport: string;

  @Field()
  @IsString()
  destinationAirport: string;

  @Field()
  @IsDate()
  departureTime: Date;

  @Field()
  @IsDate()
  arrivalTime: Date;

  @Field()
  @IsString()
  airline: string;

  @Field()
  @IsNumber()
  availableSeats: number;

  @Field()
  @IsString()
  airportId: string;
}
