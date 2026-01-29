import { Catch, NotFoundException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(NotFoundException)
export class GraphqlNotFoundFilter implements GqlExceptionFilter {
  catch(exception: NotFoundException) {
    return exception;
  }
}
