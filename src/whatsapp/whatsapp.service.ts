import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import puppeteer from 'puppeteer';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Client;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        handleSIGINT: false,
        executablePath: puppeteer.executablePath(),
        protocolTimeout: 120000,
        timeout: 60000,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-zygote',
          '--single-process',
        ],
      },
    });
  }

  onModuleInit() {
    this.initializeClient();
  }

  private initializeClient() {
    this.client.on('qr', (qr) => {
      this.logger.log('QR RECEIVED. Scan with WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp Client is ready!');
    });

    this.client.initialize();
  }

  async sendMessages(to: string | string[], message: string) {
    // 1. Normalize input to always be an array
    const recipients = Array.isArray(to) ? to : [to];
    const results: any[] = [];

    // 2. Map through recipients and send
    for (const number of recipients) {
      try {
        const chatId = number.includes('@c.us')
          ? number
          : `${number.replace('+', '')}@c.us`;
        const response = await this.client.sendMessage(chatId, message);

        this.logger.log(`Message sent successfully to ${number}`);
        results.push({ number, success: true, id: response.id._serialized });
      } catch (error) {
        this.logger.error(`Failed to send message to ${number}`, error);
        results.push({ number, success: false, error: error.message });
      }
    }
    return results;
  }
}
