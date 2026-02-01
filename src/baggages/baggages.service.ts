import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Baggage } from './baggages.entity';
import { Repository } from 'typeorm';
import { BaggageTracking } from './baggagesTracking.entity';
import { BookBaggageInput } from './inputs/bookBaggage.input';
import { User } from 'src/users/entities/user.entity';
import { PassengersService } from 'src/passengers/passengers.service';
import { MailService } from 'src/mail/mail.service';
import { UpdateBaggageStatusInput } from './inputs/updateBaggageStatus.input';
import { StaffService } from 'src/staff/staff.service';

@Injectable()
export class BaggagesService {
  constructor(
    @InjectRepository(Baggage)
    private readonly baggageRepository: Repository<Baggage>,
    @InjectRepository(BaggageTracking)
    private readonly baggageTrackingRepository: Repository<BaggageTracking>,
    private readonly passegnerService: PassengersService,
    private readonly mailService: MailService,
    private readonly staffService: StaffService,
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

  async updateBaggageStatus(data: UpdateBaggageStatusInput, user: User) {
    const baggage = await this.baggageRepository.findOne({
      where: { tagNumber: data.tagNumber, airportId: data.airportId },
    });
    if (!baggage) {
      throw new BadRequestException('Baggage not found');
    }
    const staff = await this.staffService.findStaffBy(user.id);
    if (!staff) {
      throw new BadRequestException('Staff not  found');
    }
    await this.baggageTrackingRepository.save({
      baggageId: baggage.id,
      longitude: data.lognitude,
      latitude: data.latitude,
      status: data.status,
      staffId: staff.id,
      airportId: data.airportId,
      scannedAt: new Date(),
    });
    Object.assign(baggage, {
      currentStatus: data.status,
      latitude: data.latitude,
      longitude: data.lognitude,
    });

    return this.baggageRepository.save(baggage);
  }

  async trackBaggage(tagNumber: string, user: User) {
    const baggage = await this.baggageRepository.findOne({
      where: {
        tagNumber,
        airportId: user.airportId,
      },
      relations: ['baggageTrackings'],
    });
    console.log(baggage);
    if (!baggage) {
      throw new BadRequestException('Baggage not found');
    }
    return baggage;
  }
}
