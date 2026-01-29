import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFlightInput } from './dtos/create-flight.input';
import { Flight } from './flight.entity';
import { FlightsService } from './flights.service';
import { UpdateFlightInput } from './dtos/update-flight.input';
import { FlightFilterInput } from './dtos/filter-flight.input';
import { GetFlightsOutput } from './dtos/get-flights.output';

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
