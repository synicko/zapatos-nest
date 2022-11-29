import { Module } from '@nestjs/common';
import { Table } from 'zapatos/schema';
import { ZapatosService } from './zapatos.service';

export interface ZapatosParams {
  host: string | undefined;
  port: string | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
}

@Module({})
export class ZapatosModule {
  static async forRootAsync(params: ZapatosParams) {
    ZapatosService.init(params);
    await ZapatosService.checkConnection();
    return {
      module: ZapatosModule,
    };
  }
}
