import { afterAll, beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import { createNestLibSqlConfigFactory } from './createNestLibSqlConfigFactory';
import { LibSqlConfigFixtures } from '../fixtures/LibSqlConfigFixtures';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigFactory } from '../models/NestLibSqlConfigFactory';

describe(createNestLibSqlConfigFactory.name, () => {
  describe('when called', () => {
    let nestLibSqlConfigFactoryFixture: Mocked<NestLibSqlConfigFactory>;
    let nestLibSqlConfigFixture: NestLibSqlConfig;
    let result: unknown;

    beforeAll(() => {
      nestLibSqlConfigFactoryFixture = {
        createNestLibSqlConfig: vitest.fn(),
      };
      nestLibSqlConfigFixture = LibSqlConfigFixtures.any;

      nestLibSqlConfigFactoryFixture.createNestLibSqlConfig.mockReturnValueOnce(
        nestLibSqlConfigFixture as unknown as NestLibSqlConfig | Promise<NestLibSqlConfig>,
      );

      result = createNestLibSqlConfigFactory(nestLibSqlConfigFactoryFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call nestLibSqlConfigFactoryFixture.createNestLibSqlConfig()', () => {
      expect(nestLibSqlConfigFactoryFixture.createNestLibSqlConfig).toHaveBeenCalledTimes(1);
      expect(nestLibSqlConfigFactoryFixture.createNestLibSqlConfig).toHaveBeenCalledWith();
    });

    it('should return a NestLibSqlConfig | Promise<NestLibSqlConfig>', () => {
      expect(result).toBe(nestLibSqlConfigFixture);
    });
  });
});
