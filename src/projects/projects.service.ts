import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsDTO } from './dto';
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import * as request from 'superagent';

import * as fs from 'fs';

@Injectable({})
class ProjectsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  async storeProject(projectDto: ProjectsDTO) {
    try {
      console.log(projectDto);
      const octokit = new Octokit({
        auth: this.config.get('GITHUB_TOKEN'),
      });
      const file = await octokit.request(
        `GET /repos/{owner}/{repo}/zipball/{ref}`,
        {
          owner: projectDto.owner,
          repo: projectDto.repo,
          ref: 'main',
        },
      );
      // console.log(file);
      const zipFile = 'master.zip';
      console.log(fs);
      request
        .get(file.url)
        .on('error', function (error) {
          console.log(error);
        })
        .pipe(fs.createWriteStream(zipFile))
        .on('finish', function () {
          console.log('done');
        });

      exec('srcml --verbose master.zip -o master.xml', (error, stdout) => {
        if (error) {
          console.log(error);
          process.exit(1);
        } else {
          console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        }
      });

      return {
        message: `The project ${projectDto.repo} is going to be stored `,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export { ProjectsService };
