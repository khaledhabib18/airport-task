import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { UserRole } from 'src/users/role.enum';
import { Baggage } from './baggages.entity';
import { BookBaggageInput } from './inputs/bookBaggage.input';
import { BaggagesService } from './baggages.service';
import { CurrentUser } from 'src/users/decorators/CurrentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateBaggageStatusInput } from './inputs/updateBaggageStatus.input';
import { BaggageTracking } from './baggagesTracking.entity';

@Resolver()
export class BaggagesResolver {
  constructor(private readonly baggageService: BaggagesService) {}

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.PASSENGER)
  @Mutation(() => Baggage)
  bookBaggage(
    @Args('input') input: BookBaggageInput,
    @CurrentUser() user: User,
  ) {
    return this.baggageService.bookBaggage(input, user);
  }

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.STAFF)
  @Mutation(() => Baggage)
  updateBaggageStatus(
    @Args('input') input: UpdateBaggageStatusInput,
    @CurrentUser() user: User,
  ) {
    return this.baggageService.updateBaggageStatus(input, user);
  }

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.PASSENGER)
  @Mutation(() => Baggage)
  trackBaggage(
    @Args('tagNumber') tagNumber: string,
    @CurrentUser() user: User,
  ) {
    return this.baggageService.trackBaggage(tagNumber, user);
  }
}
