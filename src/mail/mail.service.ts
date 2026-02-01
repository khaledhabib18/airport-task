import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import { User } from 'src/users/entities/user.entity';
import { MailTemplateService } from './mail-templates.service';
import { Flight } from 'src/flights/flight.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { Baggage } from 'src/baggages/baggages.entity';
import { CommonService } from 'src/common/common.service';
import { filepathToName } from 'typeorm/util/PathUtils.js';

@Injectable()
export class MailService {
  constructor(
    private readonly mailTemplateService: MailTemplateService,
    private readonly commonService: CommonService,
  ) {}
  async sendOtpEmail(user: User, otp: string) {
    const mjmlTemplate = this.mailTemplateService.generateOtpMailTemplate(
      user,
      otp,
    );
    const { html } = mjml2html(mjmlTemplate);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: '"Khaled Habib" <khaled.habib18@gmail.com>',
      to: `${user.email}`,
      subject: 'Airport: Signup OTP',
      html: html,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async sendBookingConfirmationMail(flight: Flight, user: User) {
    const mjmlTemplate =
      this.mailTemplateService.generateBookingConfirmationMailTemplate(
        flight,
        user,
      );
    const { html } = mjml2html(mjmlTemplate);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: '"Khaled Habib" <khaled.habib18@gmail.com>',
      to: `${user.email}`,
      subject: 'Airport: Signup OTP',
      html: html,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendResetPasswordMail(user: User, otp: string) {
    const mjmlTemplate =
      this.mailTemplateService.generateResetPasswordMailTemplate(user, otp);
    const { html } = mjml2html(mjmlTemplate);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: '"Khaled Habib" <khaled.habib18@gmail.com>',
      to: `${user.email}`,
      subject: 'Airport: Reset Password OTP',
      html: html,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendBaggageBookingMail(user: User, flight: Flight, baggage: Baggage) {
    const barCode = await this.commonService.generateBarCode(baggage.tagNumber);
    const mjmlTemplate =
      this.mailTemplateService.generateBaggageBookingConfirmationMailTemplate(
        user,
        flight,
        baggage,
      );
    const { html } = mjml2html(mjmlTemplate);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: '"Khaled Habib" <khaled.habib18@gmail.com>',
      to: `${user.email}`,
      subject: 'Airport : Baggage Booking Confirmation',
      html: html,
      attachments: [
        {
          filename: 'barCode.jpeg',
          content: barCode,
          encoding: 'base64',
          cid: 'unique@image.cid',
          contentType: 'image/jpeg',
        },
      ],
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
