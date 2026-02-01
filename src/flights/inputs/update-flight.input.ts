import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FlightStatus } from '../flightStatus.enum';

@InputType()
export class UpdateFlightInput {
  @Field()
  @IsUUID()
  flightId: string;

  @Field(() => FlightStatus)
  @IsEnum(FlightStatus)
  status: FlightStatus;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  delayMinutes?: number;
}
