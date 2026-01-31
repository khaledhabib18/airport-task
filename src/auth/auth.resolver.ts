import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthOutput } from './outputs/auth.output';
import { SignupUserInput } from './inputs/signup.input';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { VerifyUserInput } from './inputs/verify-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signup(@Args('input') input: SignupUserInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthOutput)
  verifyUser(@Args('input') input: VerifyUserInput) {
    return this.authService.verifyUser(input);
  }
}
