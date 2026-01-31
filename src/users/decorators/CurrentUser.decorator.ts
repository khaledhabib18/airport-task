import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext();
    return gqlReq.user;
  },
);
