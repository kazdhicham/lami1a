import { MongoClient } from 'mongodb';
//import mongoose from 'mongoose';
// eslint-disable-next-line no-undef
let uri = process.env.NEXT_PUBLIC_DB_ATLAS;
/* if (process.env.NODE_ENV === 'box')
{
  uri = process.env.DB_ATLAS
}else {

  uri = `${process.env.DB_SRV}` 
}
 */
// eslint-disable-next-line no-undef
let cached = global.mongo;
if (!cached) {
  // eslint-disable-next-line no-undef
  cached = global.mongo = { conn: null };
}
export default async function rundb() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.conn) {
      console.log('rundb');
      const coranClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      return (cached.conn = {
        coranClient,
        //collection: coranClient.db('liismaiil').collection('corans'),
      });
    }
    //const databasesList = await client.db().admin().listDatabases();
    /* console.log({ databasesList });
    databasesList.databases.forEach((database) => {
      console.log({ database });
    }); */
    //const coran = await database.collection('coran');
    //console.log(`Connected to db and collection ${database}`);
  } catch (error) {
    console.log({ error });
    return false;
  }
}
