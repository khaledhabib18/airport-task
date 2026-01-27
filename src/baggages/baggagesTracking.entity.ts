import { Staff } from 'src/staff/staff.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Baggage } from './baggages.entity';
import { BaggageStatus } from './enums/BaggageStatus-enum';
import { Airport } from 'src/airport/airport.entity';

@Entity()
export class BaggageTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, (staff) => staff.baggageTrackings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @ManyToOne(() => Baggage, (baggage) => baggage.baggageTrackings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'baggageId' })
  baggage: Baggage;

  @Column({
    type: 'enum',
    enum: BaggageStatus,
    default: BaggageStatus.CHECKED_IN,
  })
  status: BaggageStatus;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  scannedAt: Date;

  @ManyToOne(() => Airport, (airport) => airport.passengers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'airportId' })
  airport: Airport;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
