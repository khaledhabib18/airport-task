import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  PASSENGER = 'PASSENGER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
