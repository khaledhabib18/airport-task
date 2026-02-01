import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
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
import { CurrentUser } from 'src/users/decorators/CurrentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Passenger } from 'src/passengers/passenger.entity';

const pubSub = new PubSub();

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

  @Mutation(() => Boolean)
  async deleteFlight(@Args('id') id: string) {
    return this.flightsService.deleteFlight(id);
  }

  @Query(() => Flight, { name: 'getFlightInfo' })
  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.PASSENGER)
  getPassegnerFlightInfo(@Args('flightId') flightId: string) {
    return this.flightsService.getPassegnerFlightInfo(flightId);
  }

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.STAFF)
  @Mutation(() => Flight)
  async updateFlight(@Args('input') input: UpdateFlightInput): Promise<Flight> {
    const flight = await this.flightsService.updateFlight(input);
    pubSub.publish('flightUpdated', { flightUpdated: flight });
    return flight;
  }

  @Subscription(() => Flight, {
    name: 'flightUpdated',
    filter: (payload, variables) => {
      return payload.flightUpdated.id === variables.flightId;
    },
  })
  flightStatus(@Args('flightId') flightId: string) {
    return pubSub.asyncIterableIterator('flightUpdated');
  }
}
