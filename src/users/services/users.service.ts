import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CommonService } from 'src/common/common.service';
import { PassengersService } from 'src/passengers/passengers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly passegnerService: PassengersService,
  ) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email, isVerified: true },
      select: { id: true },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already used');
    }
    await this.userRepository.delete({
      email: data.email,
      isVerified: false,
    });
    const hashedPassword = await this.commonService.hashPassword(data.password);
    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    await this.passegnerService.registerPassenger({
      nationality: data.nationality,
      passportNumber: data.passportNumber,
      userId: user.id,
      airportId: data.airportId,
      user,
    });
    return user;
  }
  findUserBy(where: Partial<User>) {
    if (Object.keys(where).length < 1) {
      throw new Error('must add email or phone number');
    }
    return this.userRepository.findOne({
      where,
    });
  }

  updateUser(userId: string, data: Partial<User>) {
    return this.userRepository.update({ id: userId }, data);
  }
}
