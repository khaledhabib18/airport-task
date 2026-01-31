import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StaffRole } from './staff.enum';
import { User } from 'src/users/entities/user.entity';
import { Airport } from 'src/airport/airport.entity';
import { Flight } from 'src/flights/flight.entity';
import { BaggageTracking } from 'src/baggages/baggagesTracking.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Staff extends BaseEntity {
  @Field()
  @Column({
    type: 'enum',
    enum: StaffRole,
    default: StaffRole.CREW,
  })
  role: StaffRole;

  @Column()
  employeeId: string;

  @OneToOne(() => User, (user) => user.passenger)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Airport, (airport) => airport.passengers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @ManyToOne(() => Flight, (flight) => flight.staff, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flightId' })
  flight: Flight;

  @OneToMany(() => BaggageTracking, (baggageTracking) => baggageTracking.staff)
  baggageTrackings: BaggageTracking[];
}
