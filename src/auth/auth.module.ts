import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UsersModule, MailModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
