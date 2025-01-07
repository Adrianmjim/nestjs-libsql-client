import { NestLibSqlConfigAsync } from '../models/NestLibSqlConfigAsync';
import { NestLibSqlConfigFactoryAsyncOptions } from '../models/NestLibSqlConfigFactoryAsyncOptions';

export function isNestLibSqlConfigFactoryAsyncOptions(
  value: NestLibSqlConfigAsync,
): value is NestLibSqlConfigFactoryAsyncOptions {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (value as NestLibSqlConfigFactoryAsyncOptions).useFactory !== undefined;
}
