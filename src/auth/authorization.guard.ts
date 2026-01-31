// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './decorators/hasRole.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class Authorization implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext();

    if (!user) throw new ForbiddenException('User not found in context');

    const hasRole = requiredRoles.some((role) => user.role?.includes(role));

    if (!hasRole) throw new ForbiddenException('You do not have permission');

    return true;
  }
}
