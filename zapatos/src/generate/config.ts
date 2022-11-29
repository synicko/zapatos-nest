/*
Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2022 George MacKerron
Released under the MIT licence: see LICENCE file
*/

import * as fs from 'fs';
import * as path from 'path';
import type * as pg from 'pg';

import { TsNameTransforms, nullTransforms, snakeCamelTransforms } from '../db/core';


interface SchemaRules {
  [schema: string]: {
    include: '*' | string[];
    exclude: '*' | string[];
  };
}

interface ColumnOptions {
  [k: string]: {  // table name or "*"
    [k: string]: {  // column name
      insert?: 'auto' | 'excluded' | 'optional';
      update?: 'auto' | 'excluded';
    };
  };
}

export interface RequiredConfig {
  db: pg.ClientConfig;
}

export interface OptionalConfig {
  outDir: string;
  outExt: string;
  schemas: SchemaRules;
  debugListener: boolean | ((s: string) => void);
  progressListener: boolean | ((s: string) => void);
  warningListener: boolean | ((s: string) => void);
  customTypesTransform: 'PgMy_type' | 'my_type' | 'PgMyType' | ((s: string) => string);
  columnOptions: ColumnOptions;
  schemaJSDoc: boolean;
  unprefixedSchema: string | null;
  nameTransforms: TsNameTransforms | boolean;
}

export type Config = RequiredConfig & Partial<OptionalConfig>;
export type CompleteConfig = RequiredConfig & OptionalConfig & { nameTransforms: TsNameTransforms };

const defaultConfig: OptionalConfig = {
  outDir: '.',
  outExt: '.d.ts',
  schemas: { public: { include: '*', exclude: [] } },
  debugListener: false,
  progressListener: false,
  warningListener: true,
  customTypesTransform: 'PgMy_type',
  columnOptions: {},
  schemaJSDoc: true,
  unprefixedSchema: 'public',
  nameTransforms: false,
};

export const finaliseConfig = (config: Config) => {
  const finalConfig = { ...defaultConfig, ...config };

  finalConfig.nameTransforms =
    finalConfig.nameTransforms === false ? nullTransforms.ts :
      finalConfig.nameTransforms === true ? snakeCamelTransforms.ts :
        finalConfig.nameTransforms;

  if (!finalConfig.db || Object.keys(finalConfig.db).length < 1) throw new Error(`Zapatos needs database connection details`);
  return finalConfig as CompleteConfig;
};

export const moduleRoot = () => {
  // __dirname could be either ./generate (ts) or ./dist/generate (js)
  const parentDir = path.join(__dirname, '..');
  return fs.existsSync(path.join(parentDir, 'package.json')) ?
    parentDir :
    path.join(parentDir, '..');
};
