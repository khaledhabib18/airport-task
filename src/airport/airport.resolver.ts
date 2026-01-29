import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Airport } from './airport.entity';
import { AirportService } from './airport.service';

@Resolver(() => Airport)
export class AirportResolver {
  constructor(private readonly airportService: AirportService) {}

  @Mutation(() => Airport)
  createAirport(@Args('name') name: string): Promise<Airport> {
    return this.airportService.createAirport(name);
  }
}
