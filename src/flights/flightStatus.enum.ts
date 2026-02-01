import { registerEnumType } from '@nestjs/graphql';

export enum FlightStatus {
  ON_TIME = 'ON_TIME',
  DELAYED = 'DELAYED',
  BOARDING = 'BOARDING',
  DEPARTED = 'DEPARTED',
  LANDED = 'LANDED',
  CANCELED = 'CANCELED',
}
registerEnumType(FlightStatus, { name: 'FlightStatus' });
