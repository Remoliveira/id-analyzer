import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://admin:admin@cluster0.2dbwm.mongodb.net/?retryWrites=true&w=majority',
        },
      },
    });
  }
}
