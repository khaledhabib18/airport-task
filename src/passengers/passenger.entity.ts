import { Airport } from 'src/airport/airport.entity';
import { Baggage } from 'src/baggages/baggages.entity';
import { Flight } from 'src/flights/flight.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  passportNumber: string;

  @Column()
  nationality: string;

  @ManyToOne(() => Airport, (airport) => airport.passengers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @OneToOne(() => User, (user) => user.passenger)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Flight, (flight) => flight.passengers)
  flights: Flight[];

  @OneToMany(() => Baggage, (baggage) => baggage.passenger)
  baggages: Baggage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
