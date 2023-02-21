import * as Realm from "realm-web";

import type { ModListDocument } from '~/types/moddermore';

const app = new Realm.App({ id: process.env.REALM_APP_ID });
const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY);
const userPromise = app.logIn(credentials);

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

export { userPromise, getListsCollection, getUsersCollection };
