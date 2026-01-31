import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CommonService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateOtp(digits: number): string {
    if (process.env.NODE_ENV !== 'production') {
      return '123456';
    }
    if (digits <= 0) {
      throw new Error('Digits must be a positive number');
    }
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }

  generateUserToken(userId: string, airportId: string) {
    return jwt.sign({ userId, airportId }, process.env.JWT_SECRET!);
  }

  verifyUserToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      airportId: string;
    };
  }
}
