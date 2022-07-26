import { Injectable } from '@nestjs/common';

@Injectable({})
class ProjectsService {
  async storeProject() {
    return { message: 'The project is going to be stored' };
  }
}

export { ProjectsService };
