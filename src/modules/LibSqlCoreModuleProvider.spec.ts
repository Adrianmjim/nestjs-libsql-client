import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { Client, Config, createClient } from '@libsql/client';

vitest.mock('@libsql/client');

import { LibSqlCoreModuleProvider } from './LibSqlCoreModuleProvider';
import { LibSqlConfigFixtures } from '../fixtures/LibSqlConfigFixtures';
import { NameLibSqlConfigPair } from '../models/NameLibSqlConfigPair';

describe(LibSqlCoreModuleProvider.name, () => {
  describe('.constructor()', () => {
    describe('having a LibSqlConfig', () => {
      describe('when called', () => {
        let libSqlConfigFixture: Config;

        beforeAll(() => {
          libSqlConfigFixture = LibSqlConfigFixtures.any;

          new LibSqlCoreModuleProvider(libSqlConfigFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call createClient()', () => {
          expect(createClient).toHaveBeenCalledTimes(1);
          expect(createClient).toHaveBeenCalledWith(libSqlConfigFixture);
        });
      });
    });

    describe('having a NameLibSqlConfigPair[]', () => {
      describe('when called', () => {
        let nameLibSqlConfigPairFixture: NameLibSqlConfigPair[];

        beforeAll(() => {
          nameLibSqlConfigPairFixture = [
            {
              libSqlConfig: LibSqlConfigFixtures.any,
              name: 'name-example',
            },
          ];

          new LibSqlCoreModuleProvider(nameLibSqlConfigPairFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call createClient()', () => {
          expect(createClient).toHaveBeenCalledTimes(1);
          expect(createClient).toHaveBeenCalledWith(nameLibSqlConfigPairFixture[0]?.libSqlConfig);
        });
      });
    });
  });

  describe('.getClient()', () => {
    describe('having a a clientName undefined', () => {
      describe('when called and providers.get() returns undefined', () => {
        let libSqlConfigFixture: Config;
        let result: unknown;

        beforeAll(() => {
          libSqlConfigFixture = LibSqlConfigFixtures.any;

          const libSqlCoreModuleProvider: LibSqlCoreModuleProvider = new LibSqlCoreModuleProvider(libSqlConfigFixture);

          try {
            libSqlCoreModuleProvider.getClient();
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe('LibSqlClient does not exist.');
        });
      });

      describe('when called and providers.get() returns LibSqlClient', () => {
        let libSqlConfigFixture: Config;
        let libSqlClientFixture: Client;
        let result: unknown;

        beforeAll(() => {
          libSqlConfigFixture = LibSqlConfigFixtures.any;
          libSqlClientFixture = {} as Client;

          vitest.mocked(createClient).mockReturnValueOnce(libSqlClientFixture);

          const libSqlCoreModuleProvider: LibSqlCoreModuleProvider = new LibSqlCoreModuleProvider(libSqlConfigFixture);

          result = libSqlCoreModuleProvider.getClient();
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should return a LibSqlClient', () => {
          expect(result).toBe(libSqlClientFixture);
        });
      });
    });

    describe('having a a clientName not undefined', () => {
      describe('when called and providers.get() returns undefined', () => {
        let libSqlConfigFixture: Config;
        let clientNameFixture: string;
        let result: unknown;

        beforeAll(() => {
          libSqlConfigFixture = LibSqlConfigFixtures.any;
          clientNameFixture = 'client-name-example';

          const libSqlCoreModuleProvider: LibSqlCoreModuleProvider = new LibSqlCoreModuleProvider(libSqlConfigFixture);

          try {
            libSqlCoreModuleProvider.getClient(clientNameFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe(`No LibSqlClient with name "${clientNameFixture}" was found.`);
        });
      });
    });
  });
});
