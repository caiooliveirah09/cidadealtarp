import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Emblem } from './entities/emblem.entity';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async clearDatabase() {
    try {
      await this.dataSource.query('SET FOREIGN_KEY_CHECKS=0;');

      const entities = this.dataSource.entityMetadatas;
      for (const entity of entities) {
        const repository = this.dataSource.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE \`${entity.tableName}\`;`);
      }

      await this.dataSource.query('SET FOREIGN_KEY_CHECKS=1;');
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  async seed(authService: AuthService) {
    await this.dataSource.transaction(async (db) => {
      const emblemsData = db.create(Emblem, [
        {
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
        },
        {
          slug: 'cda-valley',
          name: 'Cidade Alta Valley',
          image:
            'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
        },
        {
          slug: 'policia',
          name: 'Policia do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
        },
        {
          slug: 'hospital',
          name: 'Hospital do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
        },
        {
          slug: 'mecanica',
          name: 'Mecânica do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
        },
        {
          slug: 'taxi',
          name: 'Taxi do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
        },
        {
          slug: 'curuja',
          name: 'Coruja',
          image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
        },
        {
          slug: 'hiena',
          name: 'Hiena',
          image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
        },
        {
          slug: 'gato',
          name: 'Gato',
          image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
        },
        {
          slug: 'urso',
          name: 'Urso',
          image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
        },
      ]);

      await db.save(emblemsData);

      await authService.signUp('teste@teste.com', '123456');
    });
  }
}
