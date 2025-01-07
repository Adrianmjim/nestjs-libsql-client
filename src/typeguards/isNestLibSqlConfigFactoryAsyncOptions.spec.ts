import { beforeAll, describe, expect, it } from 'vitest';

import { isNestLibSqlConfigFactoryAsyncOptions } from './isNestLibSqlConfigFactoryAsyncOptions';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigAsync } from '../models/NestLibSqlConfigAsync';
import { NestLibSqlConfigClassAsyncOptions } from '../models/NestLibSqlConfigClassAsyncOptions';
import { NestLibSqlConfigFactory } from '../models/NestLibSqlConfigFactory';

describe(isNestLibSqlConfigFactoryAsyncOptions.name, () => {
  describe('having a isNestLibSqlConfigFactoryAsyncOptions which is not a isNestLibSqlConfigFactoryAsyncOptions', () => {
    let appAsyncOptions: NestLibSqlConfigClassAsyncOptions;

    beforeAll(() => {
      class AppOptionsFactory implements NestLibSqlConfigFactory {
        public createNestLibSqlConfig(): NestLibSqlConfig | Promise<NestLibSqlConfig> {
          return {
            url: 'url-example',
          };
        }
      }

      appAsyncOptions = {
        useClass: AppOptionsFactory,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestLibSqlConfigFactoryAsyncOptions(appAsyncOptions);
      });

      it('should return true', () => {
        expect(result).toBeFalsy();
      });
    });
  });

  describe('having a isNestLibSqlConfigFactoryAsyncOptions', () => {
    let nestLibSqlConfigAsync: NestLibSqlConfigAsync;

    beforeAll(() => {
      nestLibSqlConfigAsync = {
        useFactory: () => ({
          url: 'url-example',
        }),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestLibSqlConfigFactoryAsyncOptions(nestLibSqlConfigAsync);
      });

      it('should return false', () => {
        expect(result).toBeTruthy();
      });
    });
  });
});
