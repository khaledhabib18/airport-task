import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { FlightsModule } from 'src/flights/flights.module';

@Module({
  providers: [StaffService, StaffResolver],
  imports: [UsersModule, TypeOrmModule.forFeature([Staff]), FlightsModule],
})
export class StaffModule {}
