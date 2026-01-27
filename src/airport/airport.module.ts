import { Module } from '@nestjs/common';
import { AirportResolver } from './airport.resolver';
import { AirportService } from './airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airport])],
  providers: [AirportResolver, AirportService],
})
export class AirportModule {}
