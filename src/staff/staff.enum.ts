import { registerEnumType } from '@nestjs/graphql';

export enum StaffRole {
  PILOT,
  CREW,
  SECURITY,
}

registerEnumType(StaffRole, {
  name: 'StaffRole',
});
