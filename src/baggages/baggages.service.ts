import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Baggage } from './baggages.entity';
import { Repository } from 'typeorm';
import { BaggageTracking } from './baggagesTracking.entity';
import { BookBaggageInput } from './inputs/bookBaggage.input';
import { User } from 'src/users/entities/user.entity';
import { PassengersService } from 'src/passengers/passengers.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class BaggagesService {
  constructor(
    @InjectRepository(Baggage)
    private readonly baggageRepository: Repository<Baggage>,
    @InjectRepository(BaggageTracking)
    private readonly baggageTrackingRepository: Repository<BaggageTracking>,
    private readonly passegnerService: PassengersService,
    private readonly mailService: MailService,
  ) {}

  async bookBaggage(data: BookBaggageInput, user: User) {
    const passenger = await this.passegnerService.findPassegnerByUserId(
      user.id,
    );
    if (!passenger) {
      throw new BadRequestException('Passenger not found ');
    }
    const flight = passenger.flights.find(
      (flight) => (flight.id = data.flightId),
    );
    if (!flight) {
      throw new BadRequestException('Flight not found ');
    }
    let baggage = this.baggageRepository.create({
      ...data,
      passengerId: passenger.id,
    });
    baggage = await this.baggageRepository.save(baggage); // in order to apply the hook bfore sendin the mail
    this.mailService.sendBaggageBookingMail(user, flight, baggage);
    return baggage;
  }
}
