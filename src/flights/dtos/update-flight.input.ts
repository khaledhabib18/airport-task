import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateFlightInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  flightNumber: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  departureAirport: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  destinationAirport: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  departureTime: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  arrivalTime: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  airline: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  availableSeats: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  airportId: string;
}
