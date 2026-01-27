import { Module } from '@nestjs/common';
import { AirportResolver } from './airport.resolver';
import { AirportService } from './airport.service';

@Module({
  providers: [AirportResolver, AirportService]
})
export class AirportModule {}
