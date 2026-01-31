import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookFlightInput } from './inputs/bookFlight.input';
import { Passenger } from './passenger.entity';
import { PassengersService } from './passengers.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { UserRole } from 'src/users/role.enum';
import { CurrentUser } from 'src/users/decorators/CurrentUser.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class PassengersResolver {
  constructor(private readonly passegnerServcie: PassengersService) {}

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.PASSENGER)
  @Mutation(() => Passenger)
  bookFlight(@Args('input') input: BookFlightInput, @CurrentUser() user: User) {
    return this.passegnerServcie.bookFlight(input, user);
  }
}
