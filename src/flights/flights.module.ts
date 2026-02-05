import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsResolver } from './flights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight]), WhatsappModule],
  providers: [FlightsService, FlightsResolver],
  exports: [FlightsService],
})
export class FlightsModule {}
