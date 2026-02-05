import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { BaggagesModule } from 'src/baggages/baggages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaggageTracking } from 'src/baggages/baggagesTracking.entity';

@Module({
  providers: [DataloaderService],
  exports: [DataloaderService],
  imports: [TypeOrmModule.forFeature([BaggageTracking])],
})
export class DataloaderModule {}
