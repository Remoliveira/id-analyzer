import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsDTO } from './dto';
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import * as request from 'superagent';

import * as fs from 'fs';
import { AlgorithmsService } from './algorithms.service';

import { PythonShell } from 'python-shell';

@Injectable({})
class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private algorithmsService: AlgorithmsService,
  ) {}
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
          ref: projectDto.branch,
        },
      );

      const zipFile = 'master.zip';

      request
        .get(file.url)
        .on('error', function (error) {
          console.log(error);
        })
        .pipe(fs.createWriteStream(zipFile))
        .on('finish', function () {
          console.log('done');
        });

      setTimeout(() => {
        this.convertToSrcml();
      }, 2.0 * 1000);

      await this.extractIdentifiers();

      this.algorithmsService.applyAlgorithms();

      return {
        message: `The project ${projectDto.repo} is going to be stored `,
      };
    } catch (error) {
      console.log(error);
    }
  }

  convertToSrcml(): void {
    exec('srcml --verbose master.zip -o master.xml', (error, stdout) => {
      if (error) {
        console.log(error);
        process.exit(1);
      } else {
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
      }
    });
  }

  async extractIdentifiers(): Promise<void> {
    try {
      PythonShell.run('Java.py', null, function (err, results) {
        if (err) throw err;

        // console.log(results);
      });
    } catch (error) {}
  }
}

export { ProjectsService };
