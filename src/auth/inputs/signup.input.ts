import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { PASSWORD_REGX } from '../auth.constants';

@InputType()
export class SignupUserInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Matches(PASSWORD_REGX)
  password: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field()
  @IsUUID()
  airportId: string;
}
