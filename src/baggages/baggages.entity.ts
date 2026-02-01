import {
  BeforeInsert,
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
  @Column({ unique: true })
  tagNumber: string;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: BaggageStatus,
    default: BaggageStatus.BOOKED,
  })
  currentStatus: BaggageStatus;

  @Column('float', { nullable: true })
  latitude: number;

  @Column('float', { nullable: true })
  longitude: number;

  @ManyToOne(() => Airport, (airport) => airport.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @Column()
  airportId: string;

  @ManyToOne(() => Flight, (flight) => flight.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flightId' })
  flight: Flight;

  @Column()
  flightId: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.baggages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger;

  @Column()
  passengerId: string;

  @OneToMany(() => BaggageTracking, (baggageTracking) => baggageTracking.staff)
  baggageTrackings: BaggageTracking[];

  @BeforeInsert()
  generateTagNumber() {
    this.tagNumber = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
}
