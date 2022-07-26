import { Controller, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('project')
class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async storeProject() {
    return await this.projectsService.storeProject();
  }
}

export { ProjectsController };
