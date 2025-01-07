<p align="center" style="vertical-align:middle">
  <a href="https://nestjs.com/" target="blank">
    <picture>
      <img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" />
    </picture>
  </a>
  <a href="https://turso.tech/" target="blank">
    <picture>
      <img src=".github/cover.png" alt="Turso">
    </picture>
  </a>
</p>

![Test](https://github.com/adrianmjim/nestjs-libsql-client/actions/workflows/codecov_test.yml/badge.svg)
[![codecov](https://codecov.io/gh/Adrianmjim/nestjs-libsql-client/graph/badge.svg?token=jNHEDepqm7)](https://codecov.io/gh/Adrianmjim/nestjs-libsql-client)
[![NPM Version](https://badge.fury.io/js/nestjs-libsql-client.svg?style=flat)](https://npmjs.org/package/nestjs-libsql-client)
[![NPM Download Stats](https://nodei.co/npm/nestjs-libsql-client.png?downloads=true)](https://www.npmjs.com/package/nestjs-libsql-client)

## Description

The [Turso Lib SQL client](https://github.com/tursodatabase/libsql-client) module for [NestJS](https://github.com/nestjs/nest).

## Installation

Install the dependencies via `npm`, `pnpm` or `yarn`:

npm:
```bash
$ npm i -s @nestjs/common @libsql/client nestjs-libsql-client
```

pnpm:
```bash
$ pnpm add @nestjs/common @libsql/client nestjs-libsql-client
```

yarn:
```bash
$ yarn add @nestjs/common @libsql/client nestjs-libsql-client
```

## Configuration

First, import the module into your NestJS application and configure it using the configuration url provided by Turso or desired local configuration

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.forRoot({
      url: 'file:local.db',
    }),
  ],
})
export class AppModule {}
```

Or, You can configure it asynchronously as follows:

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
         url: 'file:local.db',
      }),
    }),
  ],
})
export class AppModule {}
```

## Multiple connections

In certain situations, we will need to connect to different Turso databases, with this module this is possible:

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.forRoot([
      {
        name: 'connection1',
        libSqlConfig: {
           url: 'file:local.db',
        },
      },
      {
        name: 'connection2',
        libSqlConfig: {
           url: 'file:local.db2',
        },
      },
    ]),
  ],
})
export class AppModule {}
```

Or asynchronously:

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ([
        {
          name: 'connection1',
          libSqlConfig: {
            url: 'file:local.db',
          },
        },
        {
          name: 'connection2',
          libSqlConfig: {
            url: 'file:local.db2',
          },
        },
      ]),
    }),
  ],
})
export class AppModule {}
```

## Usage

First, inject the client into the module where you want to use it:

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.injectClient(),
  ],
})
export class CatModule {}
```

Or, for a specific connection:

```typescript
import { Module } from '@nestjs/common';
import { LibSqlModule } from 'nestjs-libsql-client';

@Module({
  imports: [
    LibSqlModule.injectClient('connection1', 'connection2'),
  ],
})
export class CatModule {}
```

Now you can use the Turso libsql client in any provider of your module, just use `InjectLibSqlClient` decorator:

```typescript
import { Client } from '@libsql/client';
import { InjectLibSqlClient } from 'nestjs-libsql-client';

export class CatService {
  constructor(@InjectLibSqlClient() private readonly libSqlClient: Client) {}

  public doSomething(): void {

  }
}
```

Or, for a specific connection:

```typescript
import { Client } from '@libsql/client';
import { InjectLibSqlClient } from 'nestjs-libsql-client';

export class CatService {
  constructor(
    @InjectLibSqlClient('connection1') private readonly libSqlClient: Client,
    @InjectLibSqlClient('connection2') private readonly libSqlClient2: Client,
  ) {}

  public doSomething(): void {

  }
}
```

It's also possible to use the `InjectLibSqlClient` decorator to inject the libsql client when you don't want to explicitly type it with the client:

```typescript
import { InjectLibSqlClient } from 'nestjs-libsql-client';

export class CatService {
  constructor(
    @InjectLibSqlClient() private readonly libSqlClient: unknown,
  ) {}

  public doSomething(): void {

  }
}
```

## 🤝 Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/adrianmjim/nestjs-libsql-client/issues)

Contributions, issues and feature requests are welcome.

## Authors

👤 **Adrián Martínez Jiménez**

- Github: [@adrianmjim](https://github.com/adrianmjim)

See also the list of contributors who [participated](https://github.com/adrianmjim/nestjs-libsql-client/contributors) in this project.

## Show Your Support

Please ⭐️ this repository if this project helped you!

## 📝 License

Copyright © 2024 [Adrián Martínez Jiménez](https://github.com/adrianmjim).

This project is licensed under the MIT License - see the [LICENSE file](LICENSE) for details.
