import { Inject } from '@nestjs/common';

import { getLibSqlClientId } from '../utils/getLibSqlClientId.js';

export const InjectLibSqlClient: (clientName?: string) => ParameterDecorator = (
  clientName?: string,
): ParameterDecorator => Inject(getLibSqlClientId(clientName));
