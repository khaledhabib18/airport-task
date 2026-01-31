import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { UserRole } from 'src/users/role.enum';
import { Staff } from './staff.entity';
import { hasRole } from 'src/auth/decorators/hasRole.decorator';
import { RegisterStaffInput } from './inputs/registerStaff.input';
import { UsersService } from 'src/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver()
export class StaffResolver {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  @UseGuards(AuthorizationGuard)
  @hasRole(UserRole.ADMIN)
  @Mutation(() => Staff)
  async registerStaff(@Args('input') input: RegisterStaffInput) {
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
}
