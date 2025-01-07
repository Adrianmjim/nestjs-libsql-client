import { Config } from '@libsql/client';

export interface NameLibSqlConfigPair {
  name: string;
  libSqlConfig: Config;
}
