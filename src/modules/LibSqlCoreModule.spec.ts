import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('../typeguards/isNestLibSqlConfigFactoryAsyncOptions');

import { createNestLibSqlConfigFactory } from './createNestLibSqlConfigFactory';
import { LibSqlCoreModule } from './LibSqlCoreModule';
import { LibSqlCoreModuleProvider } from './LibSqlCoreModuleProvider';
import { LibSqlConfigFixtures } from '../fixtures/LibSqlConfigFixtures';
import { NestLibSqlConfigFactoryAsyncOptionsFixtures } from '../fixtures/NestLibSqlConfigFactoryAsyncOptionsFixtures';
import { LibSqlCoreModuleInjectionSymbols } from '../models/LibSqlCoreModuleInjectionSymbols';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigClassAsyncOptions } from '../models/NestLibSqlConfigClassAsyncOptions';
import { NestLibSqlConfigFactory } from '../models/NestLibSqlConfigFactory';
import { NestLibSqlConfigFactoryAsyncOptions } from '../models/NestLibSqlConfigFactoryAsyncOptions';
import { isNestLibSqlConfigFactoryAsyncOptions } from '../typeguards/isNestLibSqlConfigFactoryAsyncOptions';

describe(LibSqlCoreModule.name, () => {
  describe('.forRoot()', () => {
    describe('when called', () => {
      let nestLibSqlConfigFixture: NestLibSqlConfig;
      let result: unknown;

      beforeAll(() => {
        nestLibSqlConfigFixture = LibSqlConfigFixtures.any;

        result = LibSqlCoreModule.forRoot(nestLibSqlConfigFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          exports: [LibSqlCoreModuleProvider],
          module: LibSqlCoreModule,
          providers: [
            {
              provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
              useValue: nestLibSqlConfigFixture,
            },
            LibSqlCoreModuleProvider,
          ],
        });
      });
    });
  });

  describe('.forRootAsync', () => {
    describe('having a NestLibSqlConfigFactoryAsyncOptions', () => {
      describe('when called', () => {
        let nestLibSqlConfigFactoryAsyncOptionsFixture: NestLibSqlConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestLibSqlConfigFactoryAsyncOptionsFixture = NestLibSqlConfigFactoryAsyncOptionsFixtures.any;

          vitest.mocked(isNestLibSqlConfigFactoryAsyncOptions).mockReturnValueOnce(true);

          result = LibSqlCoreModule.forRootAsync(nestLibSqlConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestLibSqlConfigFactoryAsyncOptions()', () => {
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestLibSqlConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [LibSqlCoreModuleProvider],
            imports: nestLibSqlConfigFactoryAsyncOptionsFixture.imports,
            module: LibSqlCoreModule,
            providers: [
              LibSqlCoreModuleProvider,
              {
                inject: nestLibSqlConfigFactoryAsyncOptionsFixture.inject,
                provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
                useFactory: nestLibSqlConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestLibSqlConfigFactoryAsyncOptions without inject', () => {
      describe('when called', () => {
        let nestLibSqlConfigFactoryAsyncOptionsFixture: NestLibSqlConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestLibSqlConfigFactoryAsyncOptionsFixture = NestLibSqlConfigFactoryAsyncOptionsFixtures.withoutInject;

          vitest.mocked(isNestLibSqlConfigFactoryAsyncOptions).mockReturnValueOnce(true);

          result = LibSqlCoreModule.forRootAsync(nestLibSqlConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestLibSqlConfigFactoryAsyncOptions()', () => {
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestLibSqlConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [LibSqlCoreModuleProvider],
            imports: nestLibSqlConfigFactoryAsyncOptionsFixture.imports,
            module: LibSqlCoreModule,
            providers: [
              LibSqlCoreModuleProvider,
              {
                inject: [],
                provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
                useFactory: nestLibSqlConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestLibSqlConfigFactoryAsyncOptions without imports', () => {
      describe('when called', () => {
        let nestLibSqlConfigFactoryAsyncOptionsFixture: NestLibSqlConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestLibSqlConfigFactoryAsyncOptionsFixture = NestLibSqlConfigFactoryAsyncOptionsFixtures.withoutImports;

          vitest.mocked(isNestLibSqlConfigFactoryAsyncOptions).mockReturnValueOnce(true);

          result = LibSqlCoreModule.forRootAsync(nestLibSqlConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestLibSqlConfigFactoryAsyncOptions()', () => {
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestLibSqlConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [LibSqlCoreModuleProvider],
            imports: [],
            module: LibSqlCoreModule,
            providers: [
              LibSqlCoreModuleProvider,
              {
                inject: nestLibSqlConfigFactoryAsyncOptionsFixture.inject,
                provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
                useFactory: nestLibSqlConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestLibSqlConfigClassAsyncOptions', () => {
      describe('when called', () => {
        let nestLibSqlConfigClassAsyncOptionsFixture: NestLibSqlConfigClassAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          class NestLibSqlConfigFactoryTest implements NestLibSqlConfigFactory {
            public createNestLibSqlConfig(): NestLibSqlConfig | Promise<NestLibSqlConfig> {
              return LibSqlConfigFixtures.any;
            }
          }

          nestLibSqlConfigClassAsyncOptionsFixture = {
            imports: [],
            useClass: NestLibSqlConfigFactoryTest,
          };

          vitest.mocked(isNestLibSqlConfigFactoryAsyncOptions).mockReturnValueOnce(false);

          result = LibSqlCoreModule.forRootAsync(nestLibSqlConfigClassAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestLibSqlConfigFactoryAsyncOptions()', () => {
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestLibSqlConfigFactoryAsyncOptions).toHaveBeenCalledWith(nestLibSqlConfigClassAsyncOptionsFixture);
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [LibSqlCoreModuleProvider],
            imports: nestLibSqlConfigClassAsyncOptionsFixture.imports,
            module: LibSqlCoreModule,
            providers: [
              LibSqlCoreModuleProvider,
              {
                provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG_FACTORY,
                useClass: nestLibSqlConfigClassAsyncOptionsFixture.useClass,
              },
              {
                inject: [LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG_FACTORY],
                provide: LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG,
                useFactory: createNestLibSqlConfigFactory,
              },
            ],
          });
        });
      });
    });
  });
});
