import { Airport } from 'src/airport/airport.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ForeignKey,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../role.enum';
import { Staff } from 'src/staff/staff.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserOTP } from './user-otp.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  phoneNumber: string;

  @ManyToOne(() => Airport, (airport) => airport.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @ForeignKey(() => Airport)
  airportId: string;

  @OneToOne(() => Passenger, (passenger) => passenger.user)
  passenger: Passenger;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @OneToMany(() => UserOTP, (userOtp) => userOtp.user)
  otps: UserOTP[];

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PASSENGER,
  })
  role: UserRole;

  @Column({ default: false })
  isVerified: boolean;
}
