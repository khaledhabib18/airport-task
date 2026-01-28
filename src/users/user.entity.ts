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
} from 'typeorm';
import { UserRole } from './role.enum';
import { Staff } from 'src/staff/staff.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => Airport, (airport) => airport.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @OneToOne(() => Passenger, (passenger) => passenger.user)
  passenger: Passenger;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Passegner,
  })
  role: UserRole;
}
