import { registerEnumType } from '@nestjs/graphql';

export enum BaggageStatus {
  BOOKED = 'BOOKED',
  CHECKED_IN = 'CHECKED_IN',
  LOADED = 'LOADED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  LOST = 'LOST',
}

registerEnumType(BaggageStatus, { name: 'BaggageStatus' });
