import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { ConfigService } from '@nestjs/config';

@Injectable({})
class AlgorithmsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async applyFirstAlgorithm(): Promise<void> {
    await console.log('here');
  }
}

export { AlgorithmsService };
