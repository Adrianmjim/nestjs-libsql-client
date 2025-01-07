import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { DynamicModule } from '@nestjs/common';

import { LibSqlCoreModule } from './LibSqlCoreModule';
import { LibSqlCoreModuleProvider } from './LibSqlCoreModuleProvider';
import { LibSqlModule } from './LibSqlModule';
import { LibSqlConfigFixtures } from '../fixtures/LibSqlConfigFixtures';
import { NestLibSqlConfigFactoryAsyncOptionsFixtures } from '../fixtures/NestLibSqlConfigFactoryAsyncOptionsFixtures';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigAsync } from '../models/NestLibSqlConfigAsync';
import { getLibSqlClientId } from '../utils/getLibSqlClientId.js';

vitest.mock('../utils/getLibSqlClientId');
vitest.mock('./LibSqlCoreModule');

describe(LibSqlModule.name, () => {
  describe('.forRoot()', () => {
    describe('when called', () => {
      let nestLibSqlConfigFixture: NestLibSqlConfig;
      let dynamicModuleFixture: DynamicModule;
      let result: unknown;

      beforeAll(() => {
        nestLibSqlConfigFixture = LibSqlConfigFixtures.any;
        dynamicModuleFixture = {
          module: LibSqlCoreModule,
        };

        vitest.mocked(LibSqlCoreModule.forRoot).mockReturnValueOnce(dynamicModuleFixture);

        result = LibSqlModule.forRoot(nestLibSqlConfigFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call SupbaseCoreModule.forRoot()', () => {
        expect(LibSqlCoreModule.forRoot).toHaveBeenCalledTimes(1);
        expect(LibSqlCoreModule.forRoot).toHaveBeenCalledWith(nestLibSqlConfigFixture);
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: LibSqlModule,
        });
      });
    });
  });

  describe('.forRootAsync()', () => {
    describe('when called', () => {
      let nestLibSqlConfigAsyncFixture: NestLibSqlConfigAsync;
      let dynamicModuleFixture: DynamicModule;
      let result: unknown;

      beforeAll(() => {
        nestLibSqlConfigAsyncFixture = NestLibSqlConfigFactoryAsyncOptionsFixtures.any;
        dynamicModuleFixture = {
          module: LibSqlCoreModule,
        };

        vitest.mocked(LibSqlCoreModule.forRootAsync).mockReturnValueOnce(dynamicModuleFixture);

        result = LibSqlModule.forRootAsync(nestLibSqlConfigAsyncFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call SupbaseCoreModule.forRoot()', () => {
        expect(LibSqlCoreModule.forRootAsync).toHaveBeenCalledTimes(1);
        expect(LibSqlCoreModule.forRootAsync).toHaveBeenCalledWith(nestLibSqlConfigAsyncFixture);
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: LibSqlModule,
        });
      });
    });
  });

  describe('.injectClient()', () => {
    describe('having a clientName undefined', () => {
      describe('when called', () => {
        let libSqlclientIdFixure: string;
        let result: unknown;

        beforeAll(() => {
          libSqlclientIdFixure = 'lib_sql_client';

          vitest.mocked(getLibSqlClientId).mockReturnValueOnce(libSqlclientIdFixure);

          result = LibSqlModule.injectClient();
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call getLibSqlClientId()', () => {
          expect(getLibSqlClientId).toHaveBeenCalledTimes(1);
          expect(getLibSqlClientId).toHaveBeenCalledWith(undefined);
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [libSqlclientIdFixure],
            module: LibSqlModule,
            providers: [
              {
                inject: [LibSqlCoreModuleProvider],
                provide: libSqlclientIdFixure,
                useFactory: expect.any(Function) as unknown as (...args: unknown[]) => unknown,
              },
            ],
          });
        });
      });
    });
  });
});
