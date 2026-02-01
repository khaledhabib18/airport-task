import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailTemplateService } from './mail-templates.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [MailService, MailTemplateService],
  exports: [MailService],
  imports: [CommonModule],
})
export class MailModule {}
