import { Config } from '@libsql/client';

export class LibSqlConfigFixtures {
  public static get any(): Config {
    const libSqlConfig: Config = {
      url: 'url-example',
    };

    return libSqlConfig;
  }
}
