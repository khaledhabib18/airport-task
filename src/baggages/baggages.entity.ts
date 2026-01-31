import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaggageStatus } from './BaggageStatus.enum';
import { Airport } from 'src/airport/airport.entity';
import { Flight } from 'src/flights/flight.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { BaggageTracking } from './baggagesTracking.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Baggage extends BaseEntity {
  @Field()
  @Column()
  tagNumber: string;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: BaggageStatus,
    default: BaggageStatus.CHECKED_IN,
  })
  currentStatus: BaggageStatus;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @ManyToOne(() => Airport, (airport) => airport.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @ManyToOne(() => Flight, (flight) => flight.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flightId' })
  flight: Flight;

  @ManyToOne(() => Passenger, (passenger) => passenger.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger;

  @OneToMany(() => BaggageTracking, (baggageTracking) => baggageTracking.staff)
  baggageTrackings: BaggageTracking[];
}
