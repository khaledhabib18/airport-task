import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { UsersModule } from './users/users.module';
import { BaggagesModule } from './baggages/baggages.module';
import { AirportModule } from './airport/airport.module';
import { PassengersModule } from './passengers/passengers.module';
import { StaffModule } from './staff/staff.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphqlNotFoundFilter } from './common/graphql-NotFoundException.filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UsersService } from './users/services/users.service';
import { CommonService } from './common/common.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [CommonModule, UsersModule],
      inject: [CommonService, UsersService],
      useFactory: async (
        commonService: CommonService,
        userService: UsersService,
      ) => ({
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true, // Modern protocol
          'subscriptions-transport-ws': true, // Legacy support
        },
        autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
        playground: true,
        introspection: true,
        csrfPrevention: true,
        context: async ({ req, extra }) => {
          // 1. Handle Subscriptions (WebSockets)
          if (extra) {
            const connectionParams = extra.connectionParams;
            // Client sends this as: { connectionParams: { Authorization: 'Bearer ...' } }
            const authHeader = connectionParams?.Authorization as string;
            const token = authHeader?.split(' ')[1];

            if (!token) return { user: null };

            const { userId } = commonService.verifyUserToken(token);
            const user = await userService.findUserBy({ id: userId });
            return { user };
          }

          // 2. Handle Queries & Mutations (HTTP)
          const token = req.headers.authorization?.split(' ')[1];
          if (!token) {
            return { user: null };
          }

          const { userId } = commonService.verifyUserToken(token);
          const user = await userService.findUserBy({ id: userId });
          return { user };
        },
      }),
    }),
    FlightsModule,
    UsersModule,
    BaggagesModule,
    AirportModule,
    PassengersModule,
    StaffModule,
    CommonModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GraphqlNotFoundFilter,
    },
  ],
})
export class AppModule {}
