import { Config } from '@libsql/client';

import { NameLibSqlConfigPair } from './NameLibSqlConfigPair';

export type NestLibSqlConfig = Config | NameLibSqlConfigPair[];
