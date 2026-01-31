import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFlightInput } from './inputs/create-flight.input';
import { Flight } from './flight.entity';
import { FlightsService } from './flights.service';
import { UpdateFlightInput } from './inputs/update-flight.input';
import { FlightFilterInput } from './inputs/filter-flight.input';
import { GetFlightsOutput } from './outputs/get-flights.output';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { UserRole } from 'src/users/role.enum';

@Resolver(() => Flight)
export class FlightsResolver {
  constructor(private readonly flightsService: FlightsService) {}

  @Query(() => GetFlightsOutput, { name: 'flights' })
  async getAllFlights(
    @Args('airportId') airportId: string,
    @Args('filter', { nullable: true }) filter: FlightFilterInput,
  ) {
    return this.flightsService.getAllFlights(airportId, filter);
  }

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.ADMIN)
  @Mutation(() => Flight)
  async createFlight(@Args('input') input: CreateFlightInput): Promise<Flight> {
    return this.flightsService.createFlight(input);
  }

  @Mutation(() => Flight)
  async updateFlight(
    @Args('id') id: string,
    @Args('input', { nullable: true }) input: UpdateFlightInput,
  ): Promise<Flight> {
    return this.flightsService.updateFlight(id, input);
  }

  @Mutation(() => Boolean)
  async deleteFlight(@Args('id') id: string) {
    return this.flightsService.deleteFlight(id);
  }
}
