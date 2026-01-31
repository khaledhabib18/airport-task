import { Field, ObjectType } from '@nestjs/graphql';
import { Airport } from 'src/airport/airport.entity';
import { Baggage } from 'src/baggages/baggages.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Flight } from 'src/flights/flight.entity';
import { User } from 'src/users/entities/user.entity';
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
@ObjectType()
export class Passenger extends BaseEntity {
  @Field()
  @Column()
  passportNumber: string;

  @Column()
  nationality: string;

  @ManyToOne(() => Airport, (airport) => airport.passengers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @Column()
  airportId: string;

  @OneToOne(() => User, (user) => user.passenger)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @ManyToMany(() => Flight, (flight) => flight.passengers)
  flights: Flight[];

  @OneToMany(() => Baggage, (baggage) => baggage.passenger)
  baggages: Baggage[];
}
