import { Pool } from 'pg';
import {
  AllType,
  select,
  selectOne,
  SQLFragment,
  sql,
  raw,
  SelectResultMode,
  count,
  sum,
  avg,
  min,
  max,
  all,
} from 'zapatos/db';
import { Table, WhereableForTable } from 'zapatos/schema';
import { Repository } from './static.repository';
import { AggTypes, ReturningType, SelectOptions } from './extra.types';

export class ReadOnlyRepository<T extends Table> extends Repository {
  protected pool: Pool;
  protected tableName: T;

  constructor(pool: Pool, tableName: T) {
    super();
    this.pool = pool;
    this.tableName = tableName;
  }

  fragment(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): SQLFragment<ReturningType<T>[]> {
    return select(this.tableName, where ?? all, options);
  }

  aggFragment(
    agg: AggTypes,
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): SQLFragment<number> {
    return select(
      this.tableName,
      where ?? all,
      options,
      SelectResultMode.Numeric,
      agg,
    );
  }

  async execute(query: SQLFragment<any>): Promise<any> {
    if (process.env.DEBUG_SQL === 'true') {
      console.log(query.compile());
    }
    return query.run(this.pool);
  }

  // BEWARE SQL injections !!!!!
  rawQuery<U>(query: string): SQLFragment<U> {
    return sql`${raw(query)} ${
      /^.*AS (\w)*$/.test(query) ? sql`` : sql`AS result`
    }` as SQLFragment<U>;
  }

  async rawExecute<U>(query: string, key?: string): Promise<U> {
    const fragment = this.rawQuery<U>(query);
    if (process.env.DEBTG_SQL === 'true') {
      console.log(fragment.compile());
    }
    const values = await this.execute(fragment);
    if (values.length === 1) return values[0][key ?? 'result'] as U;
    return values.map((el: { [x: string]: any }) => el[key ?? 'result']) as U;
  }

  // select
  async selectOne<U>(
    where: WhereableForTable<T> | SQLFragment | AllType,
    options?: SelectOptions<T>,
  ): Promise<undefined extends U ? ReturningType<T> : U> {
    return this.execute(selectOne(this.tableName, where, options));
  }

  async select<U>(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<undefined extends U ? ReturningType<T>[] : U[]> {
    return this.execute(select(this.tableName, where ?? all, options));
  }

  async count(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<number> {
    return this.execute(count(this.tableName, where ?? all, options));
  }

  async sum(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<number> {
    return this.execute(sum(this.tableName, where ?? all, options));
  }

  async avg(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<number> {
    return this.execute(avg(this.tableName, where ?? all, options));
  }

  async min(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<number> {
    return this.execute(min(this.tableName, where ?? all, options));
  }

  async max(
    where?: WhereableForTable<T> | SQLFragment | AllType | null,
    options?: SelectOptions<T>,
  ): Promise<number> {
    return this.execute(max(this.tableName, where ?? all, options));
  }
}
