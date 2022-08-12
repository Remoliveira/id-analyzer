import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsDTO } from './dto';
import { ProjectsService } from './projects.service';

@Controller('project')
class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async storeProject(@Body() dto: ProjectsDTO) {
    return await this.projectsService.storeProject(dto);
  }
}

export { ProjectsController };
