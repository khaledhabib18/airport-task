import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN,
  STAFF,
  PASSENGER,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
