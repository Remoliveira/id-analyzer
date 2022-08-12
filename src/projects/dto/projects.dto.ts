import { IsNotEmpty } from 'class-validator';

class ProjectsDTO {
  @IsNotEmpty()
  repo: string;

  @IsNotEmpty()
  owner: string;
}

export { ProjectsDTO };
