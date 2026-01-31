import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  async sendOtpEmail(user: User, otp: string) {
    const mjmlTemplate = this.generateOtpMailTemplate(user, otp);
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
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  private generateOtpMailTemplate(user: User, otp: string) {
    return `<mjml>
  <mj-body background-color="#f4f6f8">
    <mj-section>
      <mj-column>

        <mj-text font-size="20px" font-weight="bold" align="center">
          Welcome ${user.name} 🎉
        </mj-text>

        <mj-text align="center" color="#555">
          Thank you for signing up! Please confirm your account using the verification code below.
        </mj-text>

        <mj-divider border-color="#dddddd" />

        <mj-text align="center" font-size="14px" color="#888">
          Your Signup Verification Code
        </mj-text>

        <mj-text
          align="center"
          font-size="36px"
          font-weight="bold"
          letter-spacing="6px"
          color="#2d6cdf"
        >
          ${otp}
        </mj-text>

        <mj-text align="center" color="#777" font-size="13px">
          This code will expire in 10 minutes.
        </mj-text>

        <mj-divider border-color="#dddddd" />

        <mj-text align="center" font-size="12px" color="#999">
          If you didn’t create an account, please ignore this email.
        </mj-text>

        <mj-text align="center" font-size="12px" color="#999">
          © ${new Date().getFullYear()} Airport Task — All rights reserved
        </mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
  }
}
