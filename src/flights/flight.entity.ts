import { Field, ObjectType } from '@nestjs/graphql';
import { Airport } from 'src/airport/airport.entity';
import { Baggage } from 'src/baggages/baggages.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { Staff } from 'src/staff/staff.entity';
import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class Flight extends BaseEntity {
  @Field()
  @Column()
  flightNumber: string;

  @Field()
  @Column()
  departureAirport: string;

  @Field()
  @Column()
  destinationAirport: string;

  @Field()
  @Column()
  departureTime: Date;

  @Field()
  @Column()
  arrivalTime: Date;

  @Field()
  @Column()
  airline: string;

  @Field()
  @Column()
  availableSeats: number;

  @ManyToOne(() => Airport, (airport) => airport.flights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @Field()
  @Column({ nullable: true })
  airportId: string;

  @OneToMany(() => Staff, (staff) => staff.flight)
  staff: Staff[];

  @OneToMany(() => Baggage, (baggage) => baggage.flight)
  baggages: Baggage[];

  @ManyToMany(() => Passenger, (passenger) => passenger.flights)
  @JoinTable({
    name: 'FlightToPassenger',
    joinColumn: { name: 'flighId' },
    inverseJoinColumn: { name: 'passengerId' },
  })
  passengers: Passenger[];
}
