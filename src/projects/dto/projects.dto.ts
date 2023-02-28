import { IsNotEmpty } from 'class-validator';

class ProjectsDTO {
  @IsNotEmpty()
  repo: string;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  branch: string;
}

export { ProjectsDTO };
