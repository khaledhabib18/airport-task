import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersResolver } from './passengers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  providers: [PassengersService, PassengersResolver],
  exports: [PassengersService],
})
export class PassengersModule {}
