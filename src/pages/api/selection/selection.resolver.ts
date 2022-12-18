import { ProductTypeData } from '@/api/product/product.types';
import {
  SelectionTypeData, SelectionInput,
  UpdateSelectionInput, RemoveSelectionsInput
} from './selection.types';

const selections = async (
  _: unknown,
  __: undefined,
  { dbFirestore }: { dbFirestore: unknown }
): Promise<SelectionTypeData[] | undefined> => {
  try {
    const selections: SelectionTypeData[] = [];
    return dbFirestore.collection('selections').orderBy('createdAt', 'desc').get().then((querySnapshot: unknown) => {
      querySnapshot.forEach((doc: unknown) => {
        selections.push({ id: doc.id, ...doc.data() });
      });

      return selections;
    });
  } catch (error: unknown) {
    throw new Error(error);
    //  console.log({ error });
  }
};
const selectionsByAuthor = async (
  _: unknown,
  { email }: { email: string },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<Array<SelectionTypeData> | undefined> => {
  try {
    const selections: Array<SelectionTypeData> = [];
    return dbFirestore.collection('selections').where('author', '==', `${email}`).get().then((querySnapshot: unknown) => {
      querySnapshot.forEach((doc: unknown) => {
        selections.push({ id: doc.id, ...doc.data() });
      });
      return selections;
    });
  } catch (error: unknown) {
    throw new Error(error);
    //  console.log({ error });
  }
};


const selection = async (
  _: unknown,
  { titleSlug }: { titleSlug: string },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<SelectionTypeData | undefined> => {

  const snapshot = await dbFirestore.collection('selections').doc(`${titleSlug}`).get()
  if (snapshot.exists) {

    return snapshot.data();
  } /* else throw new Error('no document fount with that slug') */

};
const favorites = async (
  _: unknown,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<SelectionTypeData | undefined> => {
  try {
    //orderBy('date', 'desc').where('date', '<=', 'today').where('name', '==', 'ja');
    const snapshot = await dbFirestore.collection('selections').orderBy('createdAt', 'desc')
      .where('promote', 'array-contains', id);
    return snapshot.data();
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
const getproducts = async (
  _: unknown,
  { titleSlug }: { titleSlug: string },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<ProductTypeData[] | undefined | null> => {
  try {
    const snapshot = await dbFirestore.collection('selections').doc(`${titleSlug}`).get()
    if (snapshot.exists) {
      try {
        const products = await snapshot.data().products?.map(async (titleSlug: string) => {
          return dbFirestore.collection('products').doc(`${titleSlug}`).get().then(
            (snapshot: unknown) => {
              const product = snapshot.data();
              if (product) {
                return (product as ProductTypeData)
              }
            }
          ).catch((error: unknown) => {
            throw new Error(error)
          })
        })
        return products
      }
      catch (error: unknown) {
        throw new Error(error)

      }
    } else return null
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

// Mutations

const addSelection = async (
  _: undefined,
  { input }: { input: SelectionInput },
  { dbFirestore,
    slug,

    timeStamp,
  }: { dbFirestore: unknown; slug: unknown; storageRef: unknown; currentProfile: unknown; timeStamp: unknown }
): Promise<SelectionTypeData> => {
  const { title, status = ['FRO'], description, author, image } = input;

  const titleSlug = slug(title);
  const imageUrl = image?.url ? image : { url: 'https://via.placeholder.com/200x200.png', public_id: '00000000' };
  try {

    const createdAt = timeStamp;
    const selection = { title, titleSlug, description, author, image: imageUrl, status, createdAt };
    // return await apiCreateProduct({ product, dbProducts });
    const docRef = await dbFirestore.collection('selections').doc(titleSlug);
    return docRef.get().then(async (snapshot: unknown) => {
      if (snapshot.exists) {
        //docRef.updateDoc
        console.log(snapshot.data())
        return { ...snapshot.data() }

      } else {
        await docRef.set(selection);
        const snapshot = await dbFirestore.collection('selections').doc(titleSlug).get()
        console.log(snapshot.data())
        return snapshot.data()
      }
    });
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const updateSelection = async (
  _: undefined,
  { input }: { input: UpdateSelectionInput },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<SelectionTypeData> => {

  try {
    const { titleSlug, ...rest } = input
    const selection = await dbFirestore.collection("selections").doc(titleSlug).set({ ...rest }, { merge: true });
    return selection
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const removeSelections = async (
  _: undefined,
  { input }: { input: RemoveSelectionsInput },
  { dbFirestore, cloudinary }: { dbFirestore: unknown, cloudinary: unknown }
): Promise<{ removeSuccess: boolean }> => {
  try {
    console.log({ input })
    input.forEach(async (elm) => {
      const resultat = await dbFirestore.collection("selections").doc(elm.slug).delete();
      console.log(resultat)
      await cloudinary.uploader.destroy(elm.image_id, function (result: unknown) {
        console.log(result)
      })


    })
    return { removeSuccess: true };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const Selection = {
  titleSlug: async (
    selection: SelectionTypeData,
    _: undefined,
    { slug }: { slug: (arg: string) => string }
  ): Promise<string | undefined> => {
    return slug(selection?.title);
  },
  _id: async (selection: SelectionTypeData, __: undefined, { slug }: { slug: unknown }): Promise<string | undefined> => {
    return slug(selection.title);
  },
  products: async (selection: SelectionTypeData,
    _: undefined,
    { dbFirestore }: { dbFirestore: unknown }
  ): Promise<ProductTypeData[] | undefined | unknown> => {
    try {
      const products = await selection.products?.map(async (titleSlug) => {
        return dbFirestore.collection('products').doc(`${titleSlug}`).get().then(
          (snapshot: unknown) => {

            const product = snapshot.data();
            if (product) {
              return (product as ProductTypeData)
            }
          }
        ).catch((error: unknown) => {
          throw new Error(error)
        })
      })
      return products
    }
    catch (error: unknown) {
      throw new Error(error)

    }

  }
};

module.exports = {
  Selection,
  Query: {
    selections,
    selection,
    favorites,
    getproducts,
    selectionsByAuthor
  },
  Mutation: {
    addSelection,
    removeSelections,
    updateSelection,
  },
};
