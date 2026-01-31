import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserInput } from './inputs/signup.input';
import { UsersService } from 'src/users/services/users.service';
import { OtpService } from 'src/users/services/otp.service';
import { VerifyUserInput } from './inputs/verify-user.input';
import { User } from 'src/users/entities/user.entity';
import { CommonService } from 'src/common/common.service';
import { SigninUserInput } from './inputs/signin.input';
import { MailService } from 'src/mail/mail.service';
import { PassengersService } from 'src/passengers/passengers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly otpService: OtpService,
    private readonly commonService: CommonService,
    private readonly mailService: MailService,
    private readonly passegnerService: PassengersService,
  ) {}

  async signup(data: SignupUserInput) {
    const user = await this.userService.createUser(data);
    const otp = await this.otpService.createOtp(user.id);
    const passegner = await this.passegnerService.registerPassenger({
      nationality: data.nationality,
      passportNumber: data.passportNumber,
      airportId: data.airportId,
      userId: user.id,
      user: user,
    });
    this.mailService.sendOtpEmail(user, otp);
    return user;
  }

  async verifyUser(data: VerifyUserInput) {
    const user = await this.userService.findUserBy({ email: data.email });
    if (!user || user?.isVerified) {
      throw new BadRequestException('User is not found or already verified');
    }
    const isVerified = await this.otpService.verifyOtp(user.id, data.otp);
    await this.userService.updateUser(user.id, { isVerified });
    return this.attachAccessTokenToUser(user);
  }

  async signin(data: SigninUserInput) {
    const user = await this.userService.findUserBy({
      email: data.email,
      isVerified: true,
      role: data.role,
    });
    if (!user) {
      throw new BadRequestException('invalid user or password');
    }
    const correctPassword = await this.commonService.comparePassword(
      data.password,
      user.password,
    );
    if (!correctPassword) {
      throw new BadRequestException('invalid user or password');
    }
    return this.attachAccessTokenToUser(user);
  }

  async forgetPassword(user: User) {
    if (!user.isVerified) {
      throw new BadRequestException('Can not reset password');
    }
    const otp = await this.otpService.createOtp(user.id);
    this.mailService.sendResetPasswordMail(user, otp);
    return user;
  }

  async resetPassword(user: User, newPassword: string, otp: string) {
    const correctOtp = await this.otpService.verifyOtp(user.id, otp);
    if (!correctOtp) {
      throw new BadRequestException('wrong otp');
    }
    const hashedPassword = await this.commonService.hashPassword(newPassword);
    user.password = hashedPassword;
    await this.userService.updateUser(user.id, {
      password: hashedPassword,
    });
    return true;
  }

  private attachAccessTokenToUser(user: User): User & { accessToken: string } {
    const accessToken = this.commonService.generateUserToken(
      user.id,
      user.airportId,
    );
    return { ...user, accessToken };
  }
}
