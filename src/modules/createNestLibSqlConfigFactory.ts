import { NestLibSqlConfig } from '../models/NestLibSqlConfig';
import { NestLibSqlConfigFactory } from '../models/NestLibSqlConfigFactory';

export function createNestLibSqlConfigFactory(
  nestLibSqlConfigFactory: NestLibSqlConfigFactory,
): NestLibSqlConfig | Promise<NestLibSqlConfig> {
  return nestLibSqlConfigFactory.createNestLibSqlConfig();
}
