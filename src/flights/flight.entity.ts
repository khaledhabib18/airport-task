import { Airport } from 'src/airport/airport.entity';
import { Baggage } from 'src/baggages/baggages.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { Staff } from 'src/staff/staff.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  flightNumber: string;

  @Column()
  departureAirport: string;

  @Column()
  destinationAirport: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column()
  airline: string;

  @Column()
  availableSeats: number;

  @ManyToOne(() => Airport, (airport) => airport.flights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
