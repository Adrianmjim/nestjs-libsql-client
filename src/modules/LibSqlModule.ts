import { DynamicModule, Module } from '@nestjs/common';

import { LibSqlCoreModule } from './LibSqlCoreModule';
import { LibSqlCoreModuleProvider } from './LibSqlCoreModuleProvider';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigAsync } from '../models/NestLibSqlConfigAsync';
import { getLibSqlClientId } from '../utils/getLibSqlClientId.js';

@Module({})
export class LibSqlModule {
  public static forRoot(nestLibSqlConfig: NestLibSqlConfig): DynamicModule {
    return {
      imports: [LibSqlCoreModule.forRoot(nestLibSqlConfig)],
      module: LibSqlModule,
    };
  }

  public static forRootAsync(nestLibSqlConfigAsync: NestLibSqlConfigAsync): DynamicModule {
    return {
      imports: [LibSqlCoreModule.forRootAsync(nestLibSqlConfigAsync)],
      module: LibSqlModule,
    };
  }

  public static injectClient(...clientNames: string[]): DynamicModule {
    const initialDynamicModule: DynamicModule = {
      exports: [],
      module: LibSqlModule,
      providers: [],
    };

    const resolvedClientNames: (string | undefined)[] = [...clientNames];

    if (resolvedClientNames.length === 0) {
      resolvedClientNames.push(undefined);
    }

    const libSqlModule: DynamicModule = resolvedClientNames.reduce<DynamicModule>(
      (dynamicModule: DynamicModule, clientName: string | undefined): DynamicModule => {
        const libSqlClientId: string = getLibSqlClientId(clientName);

        dynamicModule.exports?.push(libSqlClientId);
        dynamicModule.providers?.push({
          inject: [LibSqlCoreModuleProvider],
          provide: libSqlClientId,
          useFactory: (libSqlCoreModuleProvider: LibSqlCoreModuleProvider) =>
            libSqlCoreModuleProvider.getClient(clientName),
        });

        return dynamicModule;
      },
      initialDynamicModule,
    );

    return libSqlModule;
  }
}
