import { Module } from '@nestjs/common';
import { BaggagesService } from './baggages.service';
import { BaggagesResolver } from './baggages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baggage } from './baggages.entity';
import { BaggageTracking } from './baggagesTracking.entity';
import { PassengersModule } from 'src/passengers/passengers.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  providers: [BaggagesService, BaggagesResolver],
  imports: [
    TypeOrmModule.forFeature([Baggage, BaggageTracking]),
    PassengersModule,
    MailModule,
  ],
})
export class BaggagesModule {}
