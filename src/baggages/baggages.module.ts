import { Module } from '@nestjs/common';
import { BaggagesService } from './baggages.service';
import { BaggagesResolver } from './baggages.resolver';

@Module({
  providers: [BaggagesService, BaggagesResolver]
})
export class BaggagesModule {}
