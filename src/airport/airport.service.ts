import { Injectable } from '@nestjs/common';
import { Airport } from './airport.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}
  async createAirport(name: string) {
    const airport = this.airportRepository.create({ name });
    return this.airportRepository.save(airport);
  }
}
