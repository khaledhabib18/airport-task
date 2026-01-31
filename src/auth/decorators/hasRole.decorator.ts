import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const hasRole = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
