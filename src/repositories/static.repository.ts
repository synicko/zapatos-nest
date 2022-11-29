import { Pool } from 'pg';
import {
  AllType,
  raw,
  select,
  SelectResultMode,
  sql,
  SQLFragment,
  truncate,
} from 'zapatos/db';
import { Table, WhereableForTable } from 'zapatos/schema';
import {
  AggTypes,
  ReturningType,
  SelectOptions,
  TruncateForeignKeyOpts,
  TruncateIdentityOpts,
} from './extra.types';

export class Repository {
  static pool: Pool;

  static setPool(pool: Pool) {
    this.pool = pool;
  }

  static fragment<T extends Table>(
    tableName: T,
    where?: WhereableForTable<T> | SQLFragment | AllType,
    options?: SelectOptions<T>,
  ): SQLFragment<ReturningType<T>[]> {
    return select(tableName, where ?? {}, options);
  }

  static aggFragment<T extends Table>(
    tableName: T,
    agg: AggTypes,
    where?: WhereableForTable<T> | SQLFragment | AllType,
    options?: SelectOptions<T>,
  ): SQLFragment<number> {
    return select(
      tableName,
      where ?? {},
      options,
      SelectResultMode.Numeric,
      agg,
    );
  }

  // BEWARE SQL injections !!!!!

  static rawQuery<U>(query: string): SQLFragment<U> {
    return sql`${raw(query)} ${
      /^.*AS (\w)*$/.test(query) ? sql`` : sql`AS result`
    }` as SQLFragment<U>;
  }

  static async rawExecute<T>(query: string, key?: string): Promise<T | T[]> {
    const fragment = this.rawQuery<T>(query);
    if (process.env.DEBTG_SQL === 'true') {
      console.log(fragment.compile());
    }
    if (process.env.DEBTG_SQL === 'true') {
      console.log(fragment.compile());
    }
    const values = (await fragment.run(this.pool)) as any[];
    if (values.length === 1) return values[0][key ?? 'result'] as T;
    return values.map((el: { [x: string]: any }) => el[key ?? 'result']) as T[];
  }

  static async truncate(
    tableName: Table | Table[],
    idOptions?: TruncateIdentityOpts | null,
    fkOptions?: TruncateForeignKeyOpts | null,
  ): Promise<undefined | never> {
    if (idOptions && fkOptions)
      return truncate(tableName, idOptions, fkOptions).run(this.pool);
    if (idOptions) return truncate(tableName, idOptions).run(this.pool);
    if (fkOptions) return truncate(tableName, fkOptions).run(this.pool);
    throw new Error(
      'PLease specify identity options and/or foreign key options',
    );
  }
}
