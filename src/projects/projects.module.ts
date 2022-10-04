import { Module } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService, AlgorithmsService],
})
class ProjectsModule {}

export { ProjectsModule };
