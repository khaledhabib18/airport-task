import { Field, InputType } from '@nestjs/graphql';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@InputType()
export class SignupUserInput {
  @Field()
  name: string;
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field()
  airportId: string;
}
