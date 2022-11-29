import { Pool } from 'pg';
import { Repository } from '../repositories';
import { ZapatosParams } from './zapatos.module';
import { createRepositories, Repositories } from './repositories.type';
import { setConfig } from 'zapatos/db';

export class ZapatosService {
  static pool: Pool;
  static repos: Repositories;

  static init(params: ZapatosParams) {
    this.pool = new Pool({
      connectionString: `postgresql://${params.username}:${params.password}@${params.host}:${params.port}/${params.database}`,
    });
    setConfig({
      nameTransforms: true,
    });
    this.repos = createRepositories(this.pool);
    Repository.setPool(this.pool);
  }

  static async checkConnection() {
    try {
      await this.pool.query('SELECT 1 as connected');
    } catch (error) {
      throw new Error('Not connected !');
    }
  }

  static close() {
    this.pool.end();
  }
}
