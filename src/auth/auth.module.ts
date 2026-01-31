import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { MailModule } from 'src/mail/mail.module';
import { PassengersModule } from 'src/passengers/passengers.module';

@Module({
  imports: [UsersModule, MailModule, PassengersModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
