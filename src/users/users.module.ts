import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OtpService } from './services/otp.service';
import { UserOTP } from './entities/user-otp.entity';
import { PassengersModule } from 'src/passengers/passengers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserOTP]), PassengersModule],
  providers: [UsersService, UsersResolver, OtpService],
  exports: [UsersService, OtpService],
})
export class UsersModule {}
