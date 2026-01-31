import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  Matches,
  IsPhoneNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { PASSWORD_REGX } from 'src/auth/auth.constants';
import { StaffRole } from '../staff.enum';

@InputType()
export class RegisterStaffInput {
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

  @Field()
  @IsString()
  employeeId: string;

  @Field(() => StaffRole, { defaultValue: StaffRole.CREW })
  @IsEnum(StaffRole)
  role: StaffRole = StaffRole.CREW;
}
