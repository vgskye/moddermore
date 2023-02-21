import {
  MongoClient,
  ServerApiVersion,
  type MongoClientOptions,
} from 'mongodb';

import * as Realm from "realm-web";

import type { ModListDocument } from '~/types/moddermore';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  serverApi: ServerApiVersion.v1,
};

const app = new Realm.App({ id: process.env.REALM_APP_ID });
const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY);
const userPromise = app.logIn(credentials);

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your MongoDB URI to the environment');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const getListsCollection = async () => {
  // const client = await clientPromise;
  // return client.db().collection<ModList>('lists');
  const user = await userPromise;
  return user.mongoClient(process.env.REALM_SERVICE_NAME).db(process.env.REALM_DB_NAME).collection<ModListDocument>('lists');
};

const getUsersCollection = async () => {
  // const client = await clientPromise;
  // return client.db().collection('users');
  const user = await userPromise;
  return user.mongoClient(process.env.REALM_SERVICE_NAME).db(process.env.REALM_DB_NAME).collection('users');
};

export { clientPromise, getListsCollection, getUsersCollection };
