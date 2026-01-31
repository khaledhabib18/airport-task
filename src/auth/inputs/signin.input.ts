import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
