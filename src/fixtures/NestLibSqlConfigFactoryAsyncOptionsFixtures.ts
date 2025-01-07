import { LibSqlConfigFixtures } from './LibSqlConfigFixtures';
import { NestLibSqlConfigFactoryAsyncOptions } from '../models/NestLibSqlConfigFactoryAsyncOptions';

export class NestLibSqlConfigFactoryAsyncOptionsFixtures {
  public static get any(): NestLibSqlConfigFactoryAsyncOptions {
    const nestLibSqlConfigAsync: NestLibSqlConfigFactoryAsyncOptions = {
      imports: [],
      inject: [],
      useFactory: () => LibSqlConfigFixtures.any,
    };

    return nestLibSqlConfigAsync;
  }

  public static get withoutInject(): NestLibSqlConfigFactoryAsyncOptions {
    const nestLibSqlConfigAsync: NestLibSqlConfigFactoryAsyncOptions = {
      imports: [],
      useFactory: () => LibSqlConfigFixtures.any,
    };

    return nestLibSqlConfigAsync;
  }

  public static get withoutImports(): NestLibSqlConfigFactoryAsyncOptions {
    const nestLibSqlConfigAsync: NestLibSqlConfigFactoryAsyncOptions = {
      inject: [],
      useFactory: () => LibSqlConfigFixtures.any,
    };

    return nestLibSqlConfigAsync;
  }
}
