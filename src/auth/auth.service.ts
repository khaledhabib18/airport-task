import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserInput } from './inputs/signup.input';
import { UsersService } from 'src/users/services/users.service';
import { OtpService } from 'src/users/services/otp.service';
import { VerifyUserInput } from './inputs/verify-user.input';
import { User } from 'src/users/entities/user.entity';
import { CommonService } from 'src/common/common.service';
import { SigninUserInput } from './inputs/signin.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly otpService: OtpService,
    private readonly commonService: CommonService,
  ) {}

  async signup(data: SignupUserInput) {
    const user = await this.userService.createUser(data);
    await this.otpService.createOtp(user.id);
    // TODO : send email to the user with the otp
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

  private attachAccessTokenToUser(user: User): User & { accessToken: string } {
    const accessToken = this.commonService.generateUserToken(
      user.id,
      user.airportId,
    );
    return { ...user, accessToken };
  }
}
