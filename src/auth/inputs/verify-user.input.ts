import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyUserInput {
  @Field()
  email: string;

  @Field()
  otp: string;
}
