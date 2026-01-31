import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthOutput } from './outputs/auth.output';
import { SignupUserInput } from './inputs/signup.input';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { VerifyUserInput } from './inputs/verify-user.input';
import { SigninUserInput } from './inputs/signin.input';
import { CurrentUser } from 'src/users/decorators/CurrentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { Authorization } from './authorization.guard';
import { hasRole } from './decorators/hasRole.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  registerPassenger(@Args('input') input: SignupUserInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthOutput)
  verifyPassenger(@Args('input') input: VerifyUserInput) {
    return this.authService.verifyUser(input);
  }

  @Mutation(() => AuthOutput)
  signin(@Args('input') input: SigninUserInput) {
    return this.authService.signin(input);
  }
}
