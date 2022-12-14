/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos, and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2022 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';
  import type * as c from 'zapatos/custom';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 104 }


  /* === schema: shop === */

  export namespace shop {
  
    /* --- enums --- */
    /* (none) */
  
    /* --- tables --- */
  
    /**
     * **shop.order**
     * - Table in database
     */
    export namespace order {
      export type Table = 'shop.order';
      export interface Selectable {
        /**
        * **shop.order.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.order.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt: Date;
        /**
        * **shop.order.userId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      userId: number;
      }
      export interface JSONSelectable {
        /**
        * **shop.order.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.order.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt: db.TimestampTzString;
        /**
        * **shop.order.userId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      userId: number;
      }
      export interface Whereable {
        /**
        * **shop.order.id**
        * - `int4` in database
        * - Generated column
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.order.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.order.userId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      userId?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        /**
        * **shop.order.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
        /**
        * **shop.order.userId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      userId: number | db.Parameter<number> | db.SQLFragment;
      }
      export interface Updatable {
        /**
        * **shop.order.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
        /**
        * **shop.order.userId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      userId?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
      }
      export type UniqueIndex = 'orderPkey';
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /**
     * **shop.orderItem**
     * - Table in database
     */
    export namespace orderItem {
      export type Table = 'shop.orderItem';
      export interface Selectable {
        /**
        * **shop.orderItem.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.orderItem.quantity**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      quantity: number;
        /**
        * **shop.orderItem.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number;
        /**
        * **shop.orderItem.productId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      productId: number;
      }
      export interface JSONSelectable {
        /**
        * **shop.orderItem.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.orderItem.quantity**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      quantity: number;
        /**
        * **shop.orderItem.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number;
        /**
        * **shop.orderItem.productId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      productId: number;
      }
      export interface Whereable {
        /**
        * **shop.orderItem.id**
        * - `int4` in database
        * - Generated column
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.orderItem.quantity**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      quantity?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.orderItem.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.orderItem.productId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      productId?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        /**
        * **shop.orderItem.quantity**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      quantity: number | db.Parameter<number> | db.SQLFragment;
        /**
        * **shop.orderItem.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number | db.Parameter<number> | db.SQLFragment;
        /**
        * **shop.orderItem.productId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      productId: number | db.Parameter<number> | db.SQLFragment;
      }
      export interface Updatable {
        /**
        * **shop.orderItem.quantity**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      quantity?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
        /**
        * **shop.orderItem.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
        /**
        * **shop.orderItem.productId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      productId?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
      }
      export type UniqueIndex = 'orderItemPkey';
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /**
     * **shop.product**
     * - Table in database
     */
    export namespace product {
      export type Table = 'shop.product';
      export interface Selectable {
        /**
        * **shop.product.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.product.description**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      description: string;
        /**
        * **shop.product.price**
        * - `float8` in database
        * - `NOT NULL`, no default
        */
      price: number;
        /**
        * **shop.product.attributes**
        * - `jsonb` in database
        * - Nullable, no default
        */
      attributes: db.JSONValue | null;
      }
      export interface JSONSelectable {
        /**
        * **shop.product.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.product.description**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      description: string;
        /**
        * **shop.product.price**
        * - `float8` in database
        * - `NOT NULL`, no default
        */
      price: number;
        /**
        * **shop.product.attributes**
        * - `jsonb` in database
        * - Nullable, no default
        */
      attributes: db.JSONValue | null;
      }
      export interface Whereable {
        /**
        * **shop.product.id**
        * - `int4` in database
        * - Generated column
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.product.description**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      description?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.product.price**
        * - `float8` in database
        * - `NOT NULL`, no default
        */
      price?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.product.attributes**
        * - `jsonb` in database
        * - Nullable, no default
        */
      attributes?: db.JSONValue | db.Parameter<db.JSONValue> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, db.JSONValue | db.Parameter<db.JSONValue> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        /**
        * **shop.product.description**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      description: string | db.Parameter<string> | db.SQLFragment;
        /**
        * **shop.product.price**
        * - `float8` in database
        * - `NOT NULL`, no default
        */
      price: number | db.Parameter<number> | db.SQLFragment;
        /**
        * **shop.product.attributes**
        * - `jsonb` in database
        * - Nullable, no default
        */
      attributes?: db.JSONValue | db.Parameter<db.JSONValue> | null | db.DefaultType | db.SQLFragment;
      }
      export interface Updatable {
        /**
        * **shop.product.description**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      description?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
        /**
        * **shop.product.price**
        * - `float8` in database
        * - `NOT NULL`, no default
        */
      price?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
        /**
        * **shop.product.attributes**
        * - `jsonb` in database
        * - Nullable, no default
        */
      attributes?: db.JSONValue | db.Parameter<db.JSONValue> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, db.JSONValue | db.Parameter<db.JSONValue> | null | db.DefaultType | db.SQLFragment>;
      }
      export type UniqueIndex = 'productDescriptionKey' | 'productPkey';
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /**
     * **shop.revenues**
     * - View in database
     */
    export namespace revenues {
      export type Table = 'shop.revenues';
      export interface Selectable {
        /**
        * **shop.revenues.id**
        * - `int4` in database
        * - Nullable, no default
        */
      id: number | null;
        /**
        * **shop.revenues.customer**
        * - `text` in database
        * - Nullable, no default
        */
      customer: string | null;
        /**
        * **shop.revenues.products**
        * - `_text` in database
        * - Nullable, no default
        */
      products: string[] | null;
        /**
        * **shop.revenues.total**
        * - `float8` in database
        * - Nullable, no default
        */
      total: number | null;
      }
      export interface JSONSelectable {
        /**
        * **shop.revenues.id**
        * - `int4` in database
        * - Nullable, no default
        */
      id: number | null;
        /**
        * **shop.revenues.customer**
        * - `text` in database
        * - Nullable, no default
        */
      customer: string | null;
        /**
        * **shop.revenues.products**
        * - `_text` in database
        * - Nullable, no default
        */
      products: string[] | null;
        /**
        * **shop.revenues.total**
        * - `float8` in database
        * - Nullable, no default
        */
      total: number | null;
      }
      export interface Whereable {
        /**
        * **shop.revenues.id**
        * - `int4` in database
        * - Nullable, no default
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.revenues.customer**
        * - `text` in database
        * - Nullable, no default
        */
      customer?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.revenues.products**
        * - `_text` in database
        * - Nullable, no default
        */
      products?: string[] | db.Parameter<string[]> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string[] | db.Parameter<string[]> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.revenues.total**
        * - `float8` in database
        * - Nullable, no default
        */
      total?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        [key: string]: never;
      }
      export interface Updatable {
        [key: string]: never;
      }
      export type UniqueIndex = never;
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /**
     * **shop.user**
     * - Table in database
     */
    export namespace user {
      export type Table = 'shop.user';
      export interface Selectable {
        /**
        * **shop.user.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.user.firstName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      firstName: string;
        /**
        * **shop.user.lastName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      lastName: string;
        /**
        * **shop.user.favoriteColor**
        * - `color` in database
        * - Nullable, no default
        */
      favoriteColor: c.PgColor | null;
      }
      export interface JSONSelectable {
        /**
        * **shop.user.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **shop.user.firstName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      firstName: string;
        /**
        * **shop.user.lastName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      lastName: string;
        /**
        * **shop.user.favoriteColor**
        * - `color` in database
        * - Nullable, no default
        */
      favoriteColor: c.PgColor | null;
      }
      export interface Whereable {
        /**
        * **shop.user.id**
        * - `int4` in database
        * - Generated column
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.user.firstName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      firstName?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.user.lastName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      lastName?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
        /**
        * **shop.user.favoriteColor**
        * - `color` in database
        * - Nullable, no default
        */
      favoriteColor?: c.PgColor | db.Parameter<c.PgColor> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, c.PgColor | db.Parameter<c.PgColor> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        /**
        * **shop.user.firstName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      firstName: string | db.Parameter<string> | db.SQLFragment;
        /**
        * **shop.user.lastName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      lastName: string | db.Parameter<string> | db.SQLFragment;
        /**
        * **shop.user.favoriteColor**
        * - `color` in database
        * - Nullable, no default
        */
      favoriteColor?: c.PgColor | db.Parameter<c.PgColor> | null | db.DefaultType | db.SQLFragment;
      }
      export interface Updatable {
        /**
        * **shop.user.firstName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      firstName?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
        /**
        * **shop.user.lastName**
        * - `text` in database
        * - `NOT NULL`, no default
        */
      lastName?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
        /**
        * **shop.user.favoriteColor**
        * - `color` in database
        * - Nullable, no default
        */
      favoriteColor?: c.PgColor | db.Parameter<c.PgColor> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, c.PgColor | db.Parameter<c.PgColor> | null | db.DefaultType | db.SQLFragment>;
      }
      export type UniqueIndex = 'userPkey';
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /* --- aggregate types --- */
  
    export type Table = order.Table | orderItem.Table | product.Table | revenues.Table | user.Table;
    export type Selectable = order.Selectable | orderItem.Selectable | product.Selectable | revenues.Selectable | user.Selectable;
    export type JSONSelectable = order.JSONSelectable | orderItem.JSONSelectable | product.JSONSelectable | revenues.JSONSelectable | user.JSONSelectable;
    export type Whereable = order.Whereable | orderItem.Whereable | product.Whereable | revenues.Whereable | user.Whereable;
    export type Insertable = order.Insertable | orderItem.Insertable | product.Insertable | revenues.Insertable | user.Insertable;
    export type Updatable = order.Updatable | orderItem.Updatable | product.Updatable | revenues.Updatable | user.Updatable;
    export type UniqueIndex = order.UniqueIndex | orderItem.UniqueIndex | product.UniqueIndex | revenues.UniqueIndex | user.UniqueIndex;
    export type Column = order.Column | orderItem.Column | product.Column | revenues.Column | user.Column;
  
    export type AllBaseTables = [order.Table, orderItem.Table, product.Table, user.Table];
    export type AllForeignTables = [];
    export type AllViews = [revenues.Table];
    export type AllMaterializedViews = [];
    export type AllTablesAndViews = [order.Table, orderItem.Table, product.Table, revenues.Table, user.Table];
  }


  /* === schema: billing === */

  export namespace billing {
  
    /* --- enums --- */
    /* (none) */
  
    /* --- tables --- */
  
    /**
     * **billing.invoice**
     * - Table in database
     */
    export namespace invoice {
      export type Table = 'billing.invoice';
      export interface Selectable {
        /**
        * **billing.invoice.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **billing.invoice.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number;
        /**
        * **billing.invoice.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt: Date;
        /**
        * **billing.invoice.paidAt**
        * - `timestamptz` in database
        * - Nullable, no default
        */
      paidAt: Date | null;
      }
      export interface JSONSelectable {
        /**
        * **billing.invoice.id**
        * - `int4` in database
        * - Generated column
        */
      id: number;
        /**
        * **billing.invoice.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number;
        /**
        * **billing.invoice.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt: db.TimestampTzString;
        /**
        * **billing.invoice.paidAt**
        * - `timestamptz` in database
        * - Nullable, no default
        */
      paidAt: db.TimestampTzString | null;
      }
      export interface Whereable {
        /**
        * **billing.invoice.id**
        * - `int4` in database
        * - Generated column
        */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **billing.invoice.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
        /**
        * **billing.invoice.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
        /**
        * **billing.invoice.paidAt**
        * - `timestamptz` in database
        * - Nullable, no default
        */
      paidAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
      }
      export interface Insertable {
        /**
        * **billing.invoice.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId: number | db.Parameter<number> | db.SQLFragment;
        /**
        * **billing.invoice.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
        /**
        * **billing.invoice.paidAt**
        * - `timestamptz` in database
        * - Nullable, no default
        */
      paidAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | null | db.DefaultType | db.SQLFragment;
      }
      export interface Updatable {
        /**
        * **billing.invoice.orderId**
        * - `int4` in database
        * - `NOT NULL`, no default
        */
      orderId?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
        /**
        * **billing.invoice.createdAt**
        * - `timestamptz` in database
        * - `NOT NULL`, default: `now()`
        */
      createdAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
        /**
        * **billing.invoice.paidAt**
        * - `timestamptz` in database
        * - Nullable, no default
        */
      paidAt?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | null | db.DefaultType | db.SQLFragment>;
      }
      export type UniqueIndex = 'invoiceOrderIdKey' | 'invoicePkey';
      export type Column = keyof Selectable;
      export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
      export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
      export type SQL = SQLExpression | SQLExpression[];
    }
  
    /* --- aggregate types --- */
  
    export type Table = invoice.Table;
    export type Selectable = invoice.Selectable;
    export type JSONSelectable = invoice.JSONSelectable;
    export type Whereable = invoice.Whereable;
    export type Insertable = invoice.Insertable;
    export type Updatable = invoice.Updatable;
    export type UniqueIndex = invoice.UniqueIndex;
    export type Column = invoice.Column;
  
    export type AllBaseTables = [invoice.Table];
    export type AllForeignTables = [];
    export type AllViews = [];
    export type AllMaterializedViews = [];
    export type AllTablesAndViews = [invoice.Table];
  }


  /* === global aggregate types === */

  export type Schema = 'shop' | 'billing';
  export type Table = shop.Table | billing.Table;
  export type Selectable = shop.Selectable | billing.Selectable;
  export type JSONSelectable = shop.JSONSelectable | billing.JSONSelectable;
  export type Whereable = shop.Whereable | billing.Whereable;
  export type Insertable = shop.Insertable | billing.Insertable;
  export type Updatable = shop.Updatable | billing.Updatable;
  export type UniqueIndex = shop.UniqueIndex | billing.UniqueIndex;
  export type Column = shop.Column | billing.Column;

  export type AllSchemas = ['shop', 'billing'];
  export type AllBaseTables = [...shop.AllBaseTables, ...billing.AllBaseTables];
  export type AllForeignTables = [...shop.AllForeignTables, ...billing.AllForeignTables];
  export type AllViews = [...shop.AllViews, ...billing.AllViews];
  export type AllMaterializedViews = [...shop.AllMaterializedViews, ...billing.AllMaterializedViews];
  export type AllTablesAndViews = [...shop.AllTablesAndViews, ...billing.AllTablesAndViews];


  /* === lookups === */

  export type SelectableForTable<T extends Table> = {
    "shop.order": shop.order.Selectable;
    "shop.orderItem": shop.orderItem.Selectable;
    "shop.product": shop.product.Selectable;
    "shop.revenues": shop.revenues.Selectable;
    "shop.user": shop.user.Selectable;
    "billing.invoice": billing.invoice.Selectable;
  }[T];

  export type JSONSelectableForTable<T extends Table> = {
    "shop.order": shop.order.JSONSelectable;
    "shop.orderItem": shop.orderItem.JSONSelectable;
    "shop.product": shop.product.JSONSelectable;
    "shop.revenues": shop.revenues.JSONSelectable;
    "shop.user": shop.user.JSONSelectable;
    "billing.invoice": billing.invoice.JSONSelectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    "shop.order": shop.order.Whereable;
    "shop.orderItem": shop.orderItem.Whereable;
    "shop.product": shop.product.Whereable;
    "shop.revenues": shop.revenues.Whereable;
    "shop.user": shop.user.Whereable;
    "billing.invoice": billing.invoice.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    "shop.order": shop.order.Insertable;
    "shop.orderItem": shop.orderItem.Insertable;
    "shop.product": shop.product.Insertable;
    "shop.revenues": shop.revenues.Insertable;
    "shop.user": shop.user.Insertable;
    "billing.invoice": billing.invoice.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    "shop.order": shop.order.Updatable;
    "shop.orderItem": shop.orderItem.Updatable;
    "shop.product": shop.product.Updatable;
    "shop.revenues": shop.revenues.Updatable;
    "shop.user": shop.user.Updatable;
    "billing.invoice": billing.invoice.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    "shop.order": shop.order.UniqueIndex;
    "shop.orderItem": shop.orderItem.UniqueIndex;
    "shop.product": shop.product.UniqueIndex;
    "shop.revenues": shop.revenues.UniqueIndex;
    "shop.user": shop.user.UniqueIndex;
    "billing.invoice": billing.invoice.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    "shop.order": shop.order.Column;
    "shop.orderItem": shop.orderItem.Column;
    "shop.product": shop.product.Column;
    "shop.revenues": shop.revenues.Column;
    "shop.user": shop.user.Column;
    "billing.invoice": billing.invoice.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    "shop.order": shop.order.SQL;
    "shop.orderItem": shop.orderItem.SQL;
    "shop.product": shop.product.SQL;
    "shop.revenues": shop.revenues.SQL;
    "shop.user": shop.user.SQL;
    "billing.invoice": billing.invoice.SQL;
  }[T];

}
