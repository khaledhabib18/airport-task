import { BaseEntity } from 'src/common/base.entity';
import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserOTP extends BaseEntity {
  @Column()
  otp: string;

  @Column({ type: 'timestamp without time zone' })
  expirationDate: Date;

  @ManyToOne(() => User, (user) => user.otps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}
