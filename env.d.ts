/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable no-var */
declare module globalThis {
  var _mongoClientPromise: Promise<MongoClient>;
  var __MONGO_URI__: string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly MONGODB_URI: string | undefined;
  }
}
