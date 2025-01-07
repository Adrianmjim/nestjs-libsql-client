import { Client, createClient } from '@libsql/client';
import { Inject, Injectable } from '@nestjs/common';

import { LibSqlCoreModuleInjectionSymbols } from '../models/LibSqlCoreModuleInjectionSymbols';
import { NestLibSqlConfig } from '../models/NestLibSqlConfig';

const DEFAULT_CLIENT: string = 'default';

@Injectable()
export class LibSqlCoreModuleProvider {
  private readonly libSqlClients: Map<string, Client> = new Map<string, Client>();

  public constructor(@Inject(LibSqlCoreModuleInjectionSymbols.LIB_SQL_CONFIG) nestLibSqlConfig: NestLibSqlConfig) {
    if (Array.isArray(nestLibSqlConfig)) {
      for (const nameLibSqlConfigPair of nestLibSqlConfig) {
        this.libSqlClients.set(nameLibSqlConfigPair.name, createClient(nameLibSqlConfigPair.libSqlConfig));
      }
    } else {
      this.libSqlClients.set(DEFAULT_CLIENT, createClient(nestLibSqlConfig));
    }
  }

  public getClient(clientName?: string): Client {
    const libSqlClient: Client | undefined = this.libSqlClients.get(clientName ?? DEFAULT_CLIENT);

    if (libSqlClient === undefined) {
      let errorDescription: string;

      if (clientName === undefined) {
        errorDescription = 'LibSqlClient does not exist.';
      } else {
        errorDescription = `No LibSqlClient with name "${clientName}" was found.`;
      }

      throw new Error(errorDescription);
    }

    return libSqlClient;
  }
}
