import { NestLibSqlConfig } from './NestLibSqlConfig';

export interface NestLibSqlConfigFactory {
  createNestLibSqlConfig: () => NestLibSqlConfig | Promise<NestLibSqlConfig>;
}
