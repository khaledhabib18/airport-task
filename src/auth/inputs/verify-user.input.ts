import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class VerifyUserInput {
  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  otp: string;
}
