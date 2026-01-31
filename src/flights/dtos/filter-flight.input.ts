import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FlightFilterInput {
  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  departureTime: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  destinationAirport: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  airline: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  page: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  limit: number;
}
