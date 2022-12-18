
import mongoose from 'mongoose';
import { CardTypeData } from '../card/card.types';
import { TabletTypeData, TabletType, TabletInput, UpdateTabletInput, TabletFilter, TabletData } from './tablet.types';
import { ISoura } from '@/api/coran/coran.types'
export const tablets = async (
  _: undefined,
  input: TabletFilter,
  { TabletModel }: { TabletModel: unknown }
): Promise<TabletData | undefined> => {
  try {
    const { limit, page } = input;
    let results;
    if (page > 0) {
      results = await TabletModel.find({})
        .skip((page - 1) * limit)
        .lean()
        .exec();
    } else {
      results = await TabletModel.find({}).limit(limit).lean().exec();
    }
    const data: TabletData = {
      total: results.count(),
      results,
    };
    console.log({ tabletFikteredLimitpages: results });
    return data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
/**
 * 
 *  fs.writeFile(path.join(`selection.json`), JSON.stringify(selections), async (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          const allFile = await fs.readFileSync(`selection.json`, "utf8");
          console.log(JSON.parse(allFile))
        }
      });
 */
export const tablet = async (
  _: undefined,
  titleSlug: string,
  { TabletModel }: { TabletModel: unknown }
): Promise<TabletType | undefined> => {
  try {
    const tablet = await TabletModel.findOne({ titleSlug: titleSlug }).lean().exec();
    return { tablet };
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
export const addTablet = async (
  _: undefined,
  { input }: { input: TabletInput },
  { TabletModel, slug, authorization = { id: '123445566' }, client }: {
    TabletModel: unknown; slug: unknown; currentProfile: unknown, authorization: unknown,
    client: unknown
  }
): Promise<TabletTypeData | undefined> => {
  const { title, tags, souras, description, words, tabletstatus, level, liism } = input;
  const sourats: ISoura[] | undefined = await findSoura(souras, client)
  const titleSlug = slug(title);
  console.log({ sourats });
  try {
    if (authorization) {

      const tablet = new TabletModel({ title, titleSlug, description, coll: authorization.id, souras: sourats, tags, words, tabletstatus, level, liism });
      console.log(sourats)
      console.log({ tablet })
      // return await apiCreateProduct({ product, dbProducts });
      const tableted = await tablet.save();
      return tableted;
    }
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const findSoura = async (soura: number[], client: unknown): Promise<Array<ISoura> | undefined> => {
  try {
    await client.connect();
    const coranCollection = await client.db('liismaiil').collection('corans');
    try {
      const sourats: Array<ISoura> = []
      soura.forEach(async (s) => {
        const sourat: ISoura = await coranCollection.find({ _id: s }).next();
        sourats.push(sourat)
      })

      return sourats

    } catch (error) {
      console.log({ errorCoranCollection: error });
    }
  } catch (error: unknown) {
    throw new Error(error)
  }
}

export const prepareSoura = async (
  _: undefined,
  __: undefined,
  { client }: { client: unknown, CoranModel: unknown }
): Promise<unknown[] | undefined> => {
  try {
    /* await client.connect();
    const coranCollection = await client.db('liismaiil').collection('corans');
     */
    await client.connect();
    const coranCollection = await client.db('liismaiil').collection('corans');
    const souar = coranCollection.find({}).lean().exec();
    console.log({ souar })
    const data = await souar.map(async (s: unknown) => {
      console.log({ soura: s })
    })
    console.log({ data: data.splice(2, 5) })
    return data.splice(2, 5)
  } catch (error: unknown) {
    throw new Error(error)
  } finally {
    client.close()
  }
}




export const updateTablet = async (_: undefined, input: UpdateTabletInput, { TabletModel }: { TabletModel: unknown }) => {
  try {
    const { id } = input;
    const tablet = await TabletModel.findOneAndUpdate({ _id: id }, { ...input }, { new: true });
    return tablet;
  } catch (error: unknown) {
    throw new Error(error);
  }
};
/* 
export const validateTablet = async (
  _: undefined,
  titleSlug: string,
  { currentProfile, TabletModel }: { currentProfile: unknown; TabletModel: unknown }
): Promise<TabletType> => {
  try {
    const { id } = currentProfile;
    console.log({ validateTabletResolverId: id });
    //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
    console.log({ updatetabletResolver: titleSlug });
    const tablet = await TabletModel.findOneAndUpdate({ titleSlug: titleSlug },
       { valid: true }, { new: true });
    return { tablet };
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
}; */
const Tablet = {
  cards: async (tablet: TabletTypeData, _: undefined, { CardModel }: { CardModel: unknown }): Promise<CardTypeData[]> => {
    try {
      const cards: CardTypeData[] = [];
      tablet?.cards?.forEach(async (crd) => {
        const card = await CardModel.find({ _id: new mongoose.Types.ObjectId(crd._id) });
        cards.push(card);
      });
      return cards;
    } catch (error: unknown) {
      throw new Error(error);
    }
  },
};
const removeTablet = async (
  _: undefined,
  { titleSlug }: { titleSlug: string },
  { TabletModel }: { TabletModel: unknown }
): Promise<boolean> => {
  try {
    await TabletModel.findOneAndRemove(titleSlug);

    return true;
  } catch (error: unknown) {
    throw new Error(error);
  }
};

module.exports = {
  Tablet,
  Query: {
    tablets,
    tablet,
  },
  Mutation: {
    addTablet,
    updateTablet,
    removeTablet,
  },
};
