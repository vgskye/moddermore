import { userPromise } from '~/lib/db/client';
import { blue, red } from 'kleur/colors';

(async () => {
  const client = await userPromise;

  const profileCollection = client.mongoClient(process.env.REALM_SERVICE_NAME).db(process.env.REALM_DB_NAME).collection('profile');
  const usersCollection = client.mongoClient(process.env.REALM_SERVICE_NAME).db(process.env.REALM_DB_NAME).collection('users');

  const deleteRes = await profileCollection.deleteMany({});
  console.log(red(`Deleted ${deleteRes.deletedCount} profiles`));

  const userCursor = await usersCollection.find();
  // let user = await userCursor.next();

  for (const user of userCursor) {
    if (!(await profileCollection.findOne({ email: user.email }))) {
      await profileCollection.insertOne({
        email: user.email,
        avatar: null,
        plan: 'free',
      });
      console.log('Built profile for', blue(user.email));
    } else {
      console.log('Skipped', blue(user.email));
    }

    // user = await userCursor.next();
  }

  // await client.close();
})()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
