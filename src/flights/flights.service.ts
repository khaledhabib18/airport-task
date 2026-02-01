import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { CreateFlightInput } from './inputs/create-flight.input';
import { FlightFilterInput } from './inputs/filter-flight.input';
import { Passenger } from 'src/passengers/passenger.entity';
import { UpdateFlightInput } from './inputs/update-flight.input';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    private readonly whatsappService: WhatsappService,
  ) {}

  async getAllFlights(airportId: string, filter: FlightFilterInput) {
    let page: number, limit: number;
    const whereCluase: any = {};
    if (filter) {
      page = filter.page;
      limit = filter.limit;
      if (filter.airline) {
        whereCluase.airline = filter.airline;
      }
      if (filter.departureTime) {
        whereCluase.departureTime = filter.departureTime;
      }
      if (filter.destinationAirport) {
        whereCluase.destinationAirport = filter.destinationAirport;
      }
    } else {
      page = 1;
      limit = 10;
    }
    const skip = (page! - 1) * limit!;

    const [data, total] = await this.flightRepository.findAndCount({
      where: whereCluase,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit!),
    };
  }

  async createFlight(input: CreateFlightInput): Promise<Flight> {
    const flight = this.flightRepository.create(input);
    return this.flightRepository.save(flight);
  }

  async updateFlight(data: UpdateFlightInput) {
    const { flightId, ...updateData } = data;
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
      relations: { passengers: { user: true } },
    });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    const phoneNumbers = flight?.passengers.map((p) => p.user.phoneNumber);
    Object.assign(flight!, updateData);
    const message = `✈️ Flight Status Update

Your flight ${flight.flightNumber} is *${flight.status}*.

From: ${flight.departureAirport}

To: ${flight.destinationAirport}

*Please check it on your app!*
Thank you for flying with Airport Task.`;
    this.whatsappService.sendMessages(phoneNumbers, message);
    return this.flightRepository.save(flight!);
  }

  async deleteFlight(id: string) {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    this.flightRepository.remove(flight);
    return true;
  }

  async bookFlight(passenger: Passenger, flightId: string) {
    const flight = await this.findFlightById(flightId);
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    flight.passengers = [];
    flight.passengers.push(passenger);
    flight.availableSeats = flight.availableSeats - 1;
    return this.flightRepository.save(flight);
  }

  findFlightById(id: string) {
    return this.flightRepository.findOne({ where: { id } });
  }

  getPassegnerFlightInfo(flightId) {
    return this.flightRepository.findOne({ where: { id: flightId } });
  }
}
