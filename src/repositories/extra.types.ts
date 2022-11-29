import {
  Constraint,
  ExtrasResult,
  JSONOnlyColsForTable,
  ReturningOptionsForTable,
  SelectOptionsForTable,
  SQLFragment,
  SQLFragmentMap,
  SQLFragmentOrColumnMap,
  UpsertAction,
} from 'zapatos/db';
import {
  ColumnForTable,
  InsertableForTable,
  JSONSelectableForTable,
  Table,
  UpdatableForTable,
} from 'zapatos/schema';

type ExtrasOption<T extends Table> = SQLFragmentOrColumnMap<T> | undefined;
type ColumnsOption<T extends Table> = ColumnForTable<T>[] | undefined;
type LimitedLateralOption = SQLFragmentMap | undefined;
type FullLateralOption = LimitedLateralOption | SQLFragment<any>;
type LateralOption<
  C extends ColumnsOption<Table>,
  E extends ExtrasOption<Table>,
> = undefined extends C
  ? undefined extends E
    ? FullLateralOption
    : LimitedLateralOption
  : LimitedLateralOption;

type ReturningTypeForTable<
  T extends Table,
  C extends ColumnsOption<T>,
  E extends ExtrasOption<T>,
> = (undefined extends C
  ? JSONSelectableForTable<T>
  : C extends ColumnForTable<T>[]
  ? JSONOnlyColsForTable<T, C>
  : never) &
  (undefined extends E
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      {}
    : E extends SQLFragmentOrColumnMap<T>
    ? ExtrasResult<T, E>
    : never);

type UpdateColumns<T extends Table> = ColumnForTable<T> | ColumnForTable<T>[];
type UpsertReportAction = 'suppress';

interface UpsertOptionsForTable<
  T extends Table,
  C extends ColumnsOption<T>,
  E extends ExtrasOption<T>,
  UC extends UpdateColumns<T> | undefined,
  RA extends UpsertReportAction | undefined,
> extends ReturningOptionsForTable<T, C, E> {
  updateValues?: UpdatableForTable<T>;
  updateColumns?: UC;
  noNullUpdateColumns?: UpdateColumns<T>;
  reportAction?: RA;
}

type UpsertReturnableForTable<
  T extends Table,
  C extends ColumnsOption<T>,
  E extends ExtrasOption<T>,
  RA extends UpsertReportAction | undefined,
  // eslint-disable-next-line @typescript-eslint/ban-types
> = ReturningTypeForTable<T, C, E> & (undefined extends RA ? UpsertAction : {});

export type SelectOptions<T extends Table> = SelectOptionsForTable<
  T,
  ColumnsOption<T>,
  LateralOption<ColumnsOption<T>, ExtrasOption<T>>,
  ExtrasOption<T>,
  any
>;
export type ReturningOptions<T extends Table> = ReturningOptionsForTable<
  T,
  ColumnsOption<T>,
  ExtrasOption<T>
>;

export type ConflictTarget<T extends Table> = Constraint<T> | UpdateColumns<T>;
export type UpsertOptions<T extends Table> = UpsertOptionsForTable<
  T,
  ColumnsOption<T>,
  ExtrasOption<T>,
  UpdateColumns<T> | undefined,
  UpsertReportAction | undefined
>;

export type ReturningType<T extends Table> = ReturningTypeForTable<
  T,
  ColumnsOption<T>,
  ExtrasOption<T>
>;
export type UpsertReturningType<T extends Table> =
  | UpsertReturnableForTable<
      T,
      ColumnsOption<T>,
      ExtrasOption<T>,
      UpsertReportAction | undefined
    >
  | undefined
  | never;

export type TruncateIdentityOpts = 'CONTINUE IDENTITY' | 'RESTART IDENTITY';
export type TruncateForeignKeyOpts = 'RESTRICT' | 'CASCADE';

export type AggTypes = 'count' | 'sum' | 'avg' | 'min' | 'max';

export interface InsertSignatures<T extends Table> {
  (values: InsertableForTable<T>, options?: ReturningOptions<T>): Promise<
    ReturningType<T>
  >;

  (values: InsertableForTable<T>[], options?: ReturningOptions<T>): Promise<
    ReturningType<T>[]
  >;
}

export interface UpsertSignatures<T extends Table> {
  (
    values: InsertableForTable<T>,
    conflictTarget: ConflictTarget<T>,
    options?: UpsertOptions<T>,
  ): Promise<UpsertReturningType<T>>;

  (
    values: InsertableForTable<T>[],
    conflictTarget: ConflictTarget<T>,
    options?: UpsertOptions<T>,
  ): Promise<UpsertReturningType<T>[]>;
}
