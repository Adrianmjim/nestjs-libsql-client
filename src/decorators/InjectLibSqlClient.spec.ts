import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { Inject } from '@nestjs/common';

import { InjectLibSqlClient } from './InjectLibSqlClient';
import { getLibSqlClientId } from '../utils/getLibSqlClientId.js';

vitest.mock('@nestjs/common', () => ({ Inject: vitest.fn() }));
vitest.mock('../utils/getLibSqlClientId');

describe(InjectLibSqlClient.name, () => {
  describe('when called', () => {
    let clientNameFixture: string;
    let resolvedClientNameFixture: string;

    beforeAll(() => {
      clientNameFixture = 'client-name-example';
      resolvedClientNameFixture = 'resolved-client-name-example';

      vitest.mocked(getLibSqlClientId).mockReturnValueOnce(resolvedClientNameFixture);

      InjectLibSqlClient(clientNameFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call Inject()', () => {
      expect(Inject).toHaveBeenCalledTimes(1);
      expect(Inject).toHaveBeenCalledWith(resolvedClientNameFixture);
    });

    it('should call getLibSqlClientId', () => {
      expect(getLibSqlClientId).toHaveBeenCalledTimes(1);
      expect(getLibSqlClientId).toHaveBeenCalledWith(clientNameFixture);
    });
  });
});
