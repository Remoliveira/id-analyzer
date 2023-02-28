import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PythonShell } from 'python-shell';
import { ConfigService } from '@nestjs/config';

@Injectable({})
class AlgorithmsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  applyAlgorithms(): void {
    try {
      PythonShell.run(
        'src/algorithms/categoriesAlgorithm/CategoryCatch.py',
        null,
        function (error) {
          if (error) console.log(error);

          // console.log(results);
        },
      );
    } catch (error) {}

    try {
      PythonShell.run(
        'src/algorithms/wordEmbeddingAlgorithms/fasttext2vec.py',
        null,
        function (error) {
          if (error) console.log(error);

          // console.log(results);
        },
      );
    } catch (error) {}

    try {
      PythonShell.run(
        'src/algorithms/phoneticAlgorithms/wordComplexityMeasure.py',
        null,
        function (error) {
          if (error) console.log(error);

          // console.log(results);
        },
      );
    } catch (error) {}
  }
}

export { AlgorithmsService };
