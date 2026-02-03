import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsResolver } from './flights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { AirportModule } from 'src/airport/airport.module';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightsService, FlightsResolver],
  exports: [FlightsService],
})
export class FlightsModule {}
