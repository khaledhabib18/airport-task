import { Field, ObjectType } from '@nestjs/graphql';
import { Baggage } from 'src/baggages/baggages.entity';
import { BaggageTracking } from 'src/baggages/baggagesTracking.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Flight } from 'src/flights/flight.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Airport extends BaseEntity {
  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Flight, (flight) => flight.airport, { nullable: true })
  flights: Flight[];

  @OneToMany(() => User, (user) => user.airport)
  users: User[];

  @OneToMany(() => Passenger, (passenger) => passenger.airport)
  passengers: Passenger[];

  @OneToMany(() => Baggage, (baggage) => baggage.airport, { nullable: true })
  baggages: Baggage[];

  @OneToMany(
    () => BaggageTracking,
    (baggageTrackings) => baggageTrackings.airport,
  )
  baggageTrackings: BaggageTracking[];
}
