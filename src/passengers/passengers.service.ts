import { Injectable } from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}
  registerPassenger(data: Partial<Passenger>) {
    return this.passengerRepository.save(data);
  }
}
