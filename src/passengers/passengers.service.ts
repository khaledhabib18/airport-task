import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { UserRole } from 'src/users/role.enum';
import { Args } from '@nestjs/graphql';
import { BookFlightInput } from './inputs/bookFlight.input';
import { CurrentUser } from 'src/users/decorators/CurrentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { FlightsService } from 'src/flights/flights.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
    private readonly flighService: FlightsService,
    private readonly mailService: MailService,
  ) {}
  registerPassenger(data: Partial<Passenger>) {
    return this.passengerRepository.save(data);
  }

  async bookFlight(data: BookFlightInput, user: User) {
    const storedFlight = await this.flighService.findFlightById(data.flightId);
    if (storedFlight?.availableSeats === 0) {
      throw new BadRequestException('No Avialable Seats');
    }
    const passenger = await this.passengerRepository.findOne({
      where: { userId: user.id },
      relations: ['user'],
    });
    if (!passenger) {
      throw new NotFoundException('Passegner not found');
    }
    const flight = await this.flighService.bookFlight(passenger, data.flightId);
    passenger.flights = [];
    passenger.flights.push(flight);
    this.mailService.sendBookingConfirmationMail(flight, passenger.user);
    return this.passengerRepository.save(passenger);
  }

  findPassegnerByUserId(userId: string) {
    return this.passengerRepository.findOne({
      where: { userId },
      relations: ['flights'],
    });
  }
}
