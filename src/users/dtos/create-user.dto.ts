import { Field, InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsString } from 'class-validator';
import { UserRole } from '../role.enum';

@InputType()
export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'staff',
  'passenger',
  'airport',
  'otps',
  'isVerified',
  'role',
]) {
  role?: UserRole;
}
