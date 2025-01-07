import { beforeAll, describe, expect, it } from 'vitest';

import { getLibSqlClientId } from './getLibSqlClientId';

describe(getLibSqlClientId.name, () => {
  describe('having a client name not undefined', () => {
    describe('when called', () => {
      let clientNameFixture: string;
      let result: unknown;

      beforeAll(() => {
        clientNameFixture = 'client-name-example';

        result = getLibSqlClientId(clientNameFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(`lib_sql_client_${clientNameFixture}`);
      });
    });
  });

  describe('having a client name undefined', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getLibSqlClientId();
      });

      it('should return a string', () => {
        expect(result).toBe('lib_sql_client');
      });
    });
  });
});
