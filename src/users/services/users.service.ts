import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
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
    return this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
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
