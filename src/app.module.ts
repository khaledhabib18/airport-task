import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { UsersModule } from './users/users.module';
import { BaggagesModule } from './baggages/baggages.module';
import { AirportModule } from './airport/airport.module';
import { PassengersModule } from './passengers/passengers.module';
import { StaffModule } from './staff/staff.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [FlightsModule, UsersModule, BaggagesModule, AirportModule, PassengersModule, StaffModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
