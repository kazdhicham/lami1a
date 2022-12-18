import { ISoura, IAyah } from './coran.types';
import { MongoClient } from 'mongodb';
const souras = async (_: { _: unknown }, _arg: { _arg: unknown },
  // eslint-disable-next-line @typescript-eslint/ban-types
  { atlasUrl, sortSouras }: { atlasUrl: string, sortSouras: (souras: unknown) => {} }): Promise<unknown | undefined> => {
  try {
    const client = new MongoClient(atlasUrl);

    const coranCollection = client.db('liismaiil').collection('corans');

    try {
      const souras = await coranCollection.find({}).toArray();
      const sourasSorted = sortSouras(souras)

      return sourasSorted;
    } catch (error: unknown) {
      throw new Error(error);

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

  }
  catch (error: unknown) {
    throw new Error(error);
  }
};

const soura = async (_: unknown, { id }: { id: number }, { atlasUrl }: { atlasUrl: string, coranClient: unknown }): Promise<ISoura | unknown> => {
  try {
    const client = new MongoClient(atlasUrl);

    const coranCollection = client.db('liismaiil').collection('corans');
    try {
      const soura: ISoura[] = await coranCollection.find({ _id: id });
      for await (const doc of soura) {
        console.log(doc);
        return doc;
      }
    } catch (error) {
      console.log({ errorCoranCollection: error });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  } catch (error) {
    console.log({ errorTotal: error });
  }
};

const ayahs = async (_: { _: unknown }, { id }: { id: number }, { atlasUrl }:
  { atlasUrl: string }): Promise<IAyah[] | undefined> => {
  try {
    const client = new MongoClient(atlasUrl);
    const coranCollection = client.db('liismaiil').collection('corans');
    try {
      const soura: ISoura = await coranCollection.findOne({ _id: id });
      const ayats: Array<IAyah> = await soura.ayahs.map((ayah) => {

        return ayah
      })
      console.log({ ayats })
      return ayats
    } catch (error) {
      console.log({ errorCoranCollection: error });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  } catch (error) {
    console.log({ errorTotal: error });
  }
};
/* 
const souragr = async (_: unknown, { id }: { id: number }, { atlasUrl }: { atlasUrl: string }): Promise<ISoura | unknown> => {
  try {
    const client = new MongoClient(atlasUrl);
    const coranCollection = client.db('liismaiil').collection('corans');
    try {
      const ayahs: IAyah[] = [];
      const soura: IAyah[] = await coranCollection.aggregate([
        {
          $group: { id: 'ayahs.juz' },
        },
      ]);
      for await (const doc of soura) {
        console.log(doc);
        return ayahs.push(doc);
      }
      return ayahs;
    } catch (error) {
      console.log({ errorCoranCollection: error });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  } catch (error) {
    console.log({ errorTotal: error });
  }
};
 */
module.exports = {
  Query: {
    souras,
    soura,
    ayahs,

  },
};
