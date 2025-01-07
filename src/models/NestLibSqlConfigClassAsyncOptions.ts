import { ModuleMetadata, Type } from '@nestjs/common';

import { NestLibSqlConfigFactory } from './NestLibSqlConfigFactory';

export interface NestLibSqlConfigClassAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<NestLibSqlConfigFactory>;
}
