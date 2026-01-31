import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailTemplateService } from './mail-templates.service';

@Module({
  providers: [MailService, MailTemplateService],
  exports: [MailService],
})
export class MailModule {}
