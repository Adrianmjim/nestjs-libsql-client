import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { createNestLibSqlConfigFactory } from './createNestLibSqlConfigFactory';
import { LibSqlCoreModuleProvider } from './LibSqlCoreModuleProvider';
import { LibSqlCoreModuleInjectionSymbols } from '../models/LibSqlCoreModuleInjectionSymbols';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigAsync } from '../models/NestLibSqlConfigAsync';
import { isNestLibSqlConfigFactoryAsyncOptions } from '../typeguards/isNestLibSqlConfigFactoryAsyncOptions';

@Global()
@Module({})
export class LibSqlCoreModule {
  public static forRoot(nestLibSqlConfig: NestLibSqlConfig): DynamicModule {
    return {
      exports: [LibSqlCoreModuleProvider],
      module: LibSqlCoreModule,
      providers: [
        {
          provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
          useValue: nestLibSqlConfig,
        },
        LibSqlCoreModuleProvider,
      ],
    };
  }

  public static forRootAsync(nestLibSqlConfigAsync: NestLibSqlConfigAsync): DynamicModule {
    const moduleProviders: Provider[] = [LibSqlCoreModuleProvider];

    if (isNestLibSqlConfigFactoryAsyncOptions(nestLibSqlConfigAsync)) {
      moduleProviders.push({
        inject: nestLibSqlConfigAsync.inject ?? [],
        provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
        useFactory: nestLibSqlConfigAsync.useFactory,
      });
    } else {
      moduleProviders.push({
        provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG_FACTORY,
        useClass: nestLibSqlConfigAsync.useClass,
      });

      moduleProviders.push({
        inject: [LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG_FACTORY],
        provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
        useFactory: createNestLibSqlConfigFactory,
      });
    }

    return {
      exports: [LibSqlCoreModuleProvider],
      imports: nestLibSqlConfigAsync.imports ?? [],
      module: LibSqlCoreModule,
      providers: moduleProviders,
    };
  }
}
