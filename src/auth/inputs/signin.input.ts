import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/users/role.enum';

@InputType()
export class SigninUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsEnum(UserRole)
  @Field(() => UserRole, { defaultValue: UserRole.PASSENGER })
  role: UserRole = UserRole.PASSENGER;
}
