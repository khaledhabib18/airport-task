import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { UserRole } from 'src/users/role.enum';
import { Staff } from './staff.entity';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { RegisterStaffInput } from './inputs/registerStaff.input';
import { UsersService } from 'src/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from 'src/passengers/passenger.entity';
import { FlightsService } from 'src/flights/flights.service';
import { AssignStaffToFligh } from './inputs/assignStaffToFlight.input';
import { StaffService } from './staff.service';

@Resolver()
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.ADMIN)
  @Mutation(() => Staff)
  async registerStaff(@Args('input') input: RegisterStaffInput) {
    return this.staffService.registerStaff(input);
  }

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.ADMIN)
  @Mutation(() => Staff)
  async assigStaffToFlight(@Args('input') input: AssignStaffToFligh) {
    return this.staffService.assigStaffToFlight(input);
  }
}
