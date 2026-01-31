import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersResolver } from './passengers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger.entity';
import { FlightsModule } from 'src/flights/flights.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger]), FlightsModule, MailModule],
  providers: [PassengersService, PassengersResolver],
  exports: [PassengersService],
})
export class PassengersModule {}
