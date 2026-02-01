import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsString,
  IsUUID,
} from 'class-validator';
import { BaggageStatus } from '../BaggageStatus.enum';

@InputType()
export class UpdateBaggageStatusInput {
  @Field()
  @IsString()
  tagNumber: string;

  @Field(() => BaggageStatus)
  @IsEnum(BaggageStatus)
  status: BaggageStatus;

  @Field()
  @IsLatitude()
  latitude: number;

  @Field()
  @IsLongitude()
  lognitude: number;

  @Field()
  @IsUUID()
  airportId: string;
}
