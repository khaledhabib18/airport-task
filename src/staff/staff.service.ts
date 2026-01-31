import { BadRequestException, Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { AssignStaffToFligh } from './inputs/assignStaffToFlight.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { FlightsService } from 'src/flights/flights.service';
import { RegisterStaffInput } from './inputs/registerStaff.input';
import { UserRole } from 'src/users/role.enum';

@Injectable()
export class StaffService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly flightService: FlightsService,
  ) {}

  async registerStaff(input: RegisterStaffInput) {
    const { employeeId, role, airportId, ...userData } = input;
    const user = await this.userService.createUser({
      ...userData,
      airportId,
      role: UserRole.STAFF,
    });
    return this.staffRepository.save({
      employeeId,
      role,
      user,
      airportId,
    });
  }

  async assigStaffToFlight(input: AssignStaffToFligh) {
    const staff = await this.staffRepository.findOne({
      where: { id: input.staffId },
    });
    if (!staff) {
      throw new BadRequestException('Staff not found');
    }
    const flight = await this.flightService.findFlightById(input.flightId);
    if (!flight) {
      throw new BadRequestException('Fligh not found');
    }
    return await this.staffRepository.update(
      { id: staff.id },
      { flightId: flight.id },
    );
  }
}
