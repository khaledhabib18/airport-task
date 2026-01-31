import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Airport } from './airport.entity';
import { AirportService } from './airport.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { UserRole } from 'src/users/role.enum';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';

@Resolver(() => Airport)
export class AirportResolver {
  constructor(private readonly airportService: AirportService) {}

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.ADMIN)
  @Mutation(() => Airport)
  createAirport(@Args('name') name: string): Promise<Airport> {
    return this.airportService.createAirport(name);
  }
}
