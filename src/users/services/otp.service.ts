import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOTP } from '../entities/user-otp.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { UsersService } from './users.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(UserOTP)
    private readonly otpRepository: Repository<UserOTP>,
    private readonly commonService: CommonService,
    private readonly userService: UsersService,
  ) {}
  async createOtp(userId: string) {
    await this.otpRepository.delete({ userId });
    const otp = this.commonService.generateOtp(6);
    const expirationDate = new Date(Date.now() + 10 * 60 * 1000);
    await this.otpRepository.save({
      userId,
      otp,
      expirationDate,
    });
    return otp;
  }

  async verifyOtp(userId: string, otp: string) {
    const storedOtp = await this.otpRepository.findOne({ where: { userId } });
    if (
      !storedOtp ||
      storedOtp?.expirationDate.getTime() < Date.now() ||
      otp !== storedOtp.otp
    ) {
      throw new BadRequestException('invalid OTP');
    }
    await this.userService.updateUser(userId, { isVerified: true });
    return true;
  }
}
