import {
  deletes,
  insert,
  SQLFragment,
  truncate,
  update,
  upsert,
} from 'zapatos/db';
import { Table, UpdatableForTable, WhereableForTable } from 'zapatos/schema';
import {
  ConflictTarget,
  InsertSignatures,
  ReturningOptions,
  ReturningType,
  TruncateForeignKeyOpts,
  TruncateIdentityOpts,
  UpsertSignatures,
} from './extra.types';
import { ReadOnlyRepository } from './read-only.repository';

export class ReadWriteRepository<
  T extends Table,
> extends ReadOnlyRepository<T> {
  //insert
  insert: InsertSignatures<T> = async (
    values: any,
    options?: ReturningOptions<T>,
  ): Promise<any | undefined> => {
    return this.execute(insert(this.tableName, values, options));
  };

  // upsert
  upsert: UpsertSignatures<T> = async (
    values: any,
    conflictTarget: ConflictTarget<T>,
    options?: ReturningOptions<T>,
  ): Promise<any | undefined> => {
    return this.execute(
      upsert(this.tableName, values, conflictTarget, options),
    );
  };

  // update
  async update(
    values: UpdatableForTable<T>,
    where: WhereableForTable<T> | SQLFragment,
    options?: ReturningOptions<T>,
  ): Promise<ReturningType<T>[]> {
    return this.execute(update(this.tableName, values, where, options));
  }

  //delete
  async delete(
    where: WhereableForTable<T> | SQLFragment,
    options?: ReturningOptions<T>,
  ): Promise<ReturningType<T>[]> {
    return this.execute(deletes(this.tableName, where, options));
  }

  //truncate
  async truncate(
    idOptions?: TruncateIdentityOpts | null,
    fkOptions?: TruncateForeignKeyOpts | null,
  ): Promise<undefined | never> {
    if (idOptions && fkOptions)
      return this.execute(truncate(this.tableName, idOptions, fkOptions));
    if (idOptions) return this.execute(truncate(this.tableName, idOptions));
    if (fkOptions) return this.execute(truncate(this.tableName, fkOptions));
    throw new Error(
      'PLease specify identity options and/or foreign key options',
    );
  }
}
