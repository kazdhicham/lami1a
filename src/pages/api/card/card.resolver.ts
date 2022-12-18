import { CardInput,  CardData } from './card.types';
const cards = async (_:undefined, input: CardFilter, { CardModel }: { CardModel: unknown }): Promise<CardData> => {
  try {
    const { limit = 0, page = 0 } = input;
    let results;
    if (page > 0) {
      results = await CardModel.find({})
        .skip((page - 1) * limit)
        .lean()
        .exec();
    } else {
      results = await CardModel.find({}).limit(limit).lean().exec();
    }
    const data: CardData = {
      total: results.count(),
      results,
    };
    console.log({ CardFiltered: results });
    return data;
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};

const card = async (_: undefined, { id }: { id: number }, { CardModel }: { CardModel: unknown }): Promise<unknown> => {
  return await CardModel.findOne({ id }).exec();
};
const addCard = async (
  _: undefined,
  { input }: { input: CardInput },
  { CardModel }: { CardModel: unknown }
): Promise<unknown> => {
  await CardModel.create(input);
};
const updateCard = async (
  _: undefined,
  { id, input }: { id: number; input: CardInput },
  { CardModel }: { CardModel: unknown }
): Promise<unknown> => {
  await CardModel.update(id, { $set: { input } }).exec();
};
const validateCard = async (
  _: undefined,
  { id }: { id: string },
  { auth, dbProfiles, timeStamp, req }: { auth: unknown; dbProfiles: unknown; timeStamp: unknown; req: unknown }
): Promise<unknown> => {
  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
  // console.log({ currentUserUpdatePrublic: currentUser });
  const { uid } = currentUser;
  //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
  const updatedAt = timeStamp;
  const docRef = await dbProfiles.doc(`${uid}`);
  docRef
    .get()
    .then((snapshot: unknown) => {
      console.log({ snapshotPrivate: snapshot });
      const { cardsValid } = snapshot.data();
      snapshot
        .set({ cardsValid: [...cardsValid, id], updatedAt }, { merge: true })
        .then(async () => {
          console.log('in the the of set');
          docRef
            .get()
            .then((snapshot2: unknown) => {
              if (snapshot2.exists) {
                console.log({ currentUserUpdatePrivate: snapshot2.data() });
                return snapshot2.data();
              } else {
                console.log(`cant find document ${uid} in database`);
              }
            })
            .catch((error: unknown) => {
              console.log(`${error?.message} cant set document for ${uid} index`);
            });
        })
        .catch((error: unknown) => {
          console.log(`${error?.message} cant find document ${uid} in database`);
        });
    })
    .catch((error: unknown) => {
      console.log(`${error?.message} cant find document ${uid} in database`);
    });
};

const removeCard = async (_: undefined, { id }: { id: number }, { CardModel }: { CardModel: unknown }): Promise<unknown> => {
  return await CardModel.delete(id);
};

const CardResolver = {
  Query: {
    cards,
    card,
  },
  Mutation: {
    addCard,
    updateCard,
    validateCard,
    removeCard,
  },
};
export default CardResolver;
