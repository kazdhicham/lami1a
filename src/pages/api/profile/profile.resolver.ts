import { DateTimeResolver } from 'graphql-scalars';
import {
  AddProfileInput, ProfileTypeData, UpdateProfileInput, PromoteInputType,
  AddProfileOutput, StudsEnrollmentInput, AddDiscountTokenInput, SendMessageInput,
} from '@/api/profile/profile.types';

const profile = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: unknown }
): Promise<ProfileTypeData | undefined> => {
  try {
    //  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
    const dbProfiles = dbFirestore.collection('profiles');

    if (id) {
      const profileRef = await dbProfiles.doc(id);
      return profileRef
        .get()
        .then((profileSnapshot: unknown) => {
          if (profileSnapshot.exists) {
            /*   console.log(profileSnapshot.data()) */
            return profileSnapshot.data();
          } else {
            throw new Error();
          }
        })
        .catch((error: unknown) => {
          console.log({ errorProfileResolver: error });
          throw new Error(error);
        });
    } else {
      console.log(`ìd is empty ${id}`);
      throw new Error('Id is empty')
    }
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const profiles = async (
  _: undefined,
  __: undefined,
  { dbFirestore }: { dbFirestore: unknown }
): Promise<ProfileTypeData[] | undefined> => {
  try {
    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('profiles').get();

    const profiles: unknown[] = [];
    snapshot.forEach(async (doc: unknown) => {
      const profile = await doc.data();
      profiles.push(profile);
    });


    return profiles;
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};



//Mutations

const addProfile = async (
  _: undefined,
  { input }: { input: AddProfileInput },
  { dbFirestore }: { dbFirestore: unknown; }
): Promise<AddProfileOutput | undefined> => {
  try {
    const { id, email } = input;
    return dbFirestore.collection('profiles')
      .doc(`${id}`)
      .get()
      .then((profileSnapshot: unknown) => {
        if (profileSnapshot.exists) {
          console.log({ createProfileResolver: profileSnapshot.data() });
          const { _id, email } = profileSnapshot.data();

          return ({ _id, email })
        } else {
          dbFirestore.collection('profiles').doc(`${id}`).set({ _id: id, email });
          return ({ _id: id, email });
        }
      })
      .catch((error: unknown) => {
        throw new Error(error)
      });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(error);
  }
};

const updateProfile = async (
  _: undefined,
  { input }: { input: UpdateProfileInput },
  { dbFirestore,
    timeStamp,
  }: { dbFirestore: unknown; timeStamp: unknown }
): Promise<ProfileTypeData> => {
  try {
    const { id, name, destination, building, street, city, state, country, contact, zip, phone, login, role } = input;

    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`)
    return docRef.get()
      .then((snapshot: unknown) => {
        if (snapshot.exists) {
          return docRef.set(
            { login, role: [...role], phone, address: { name, destination, building, street, city, state, country, contact, zip }, updatedAt },
            { merge: true }
          )
            .then(() => {

              return profile(_, { id }, { dbFirestore }).then((profileData: ProfileTypeData | undefined) => {
                return profileData
              })
            })
            .catch((error: unknown) => {
              console.log(`${error?.message} cant find document ${id} in database`);
            });

        } else {
          console.log(`cant find Profile ${id} in database`);
        }
      })
      .catch((error: unknown) => {
        console.log(`${error?.message} cant find document ${id} in database`);
        throw new Error(error)
      });

  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};


const sendMessage = async (
  _: undefined,
  { input }: { input: SendMessageInput },
  { dbFirestore, FieldValue }: { dbFirestore: unknown, FieldValue: unknown }
): Promise<ProfileTypeData> => {
  try {
    console.log({ input })
    const { sender, content, id, rec, product } = input;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`)
    await docRef.update({ messages: FieldValue.arrayUnion({ content, rec, sender, product, date: new Date() }) })
    const profileSnapshot = await docRef.get()
    if (profileSnapshot.exists) {

      return profileSnapshot.data()
    } else {
      throw new Error('Cant send Message for this product')
    }

  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const removeProfile = async (
  _: undefined,
  __: undefined,
  { currentProfile, dbFirestore }: { currentProfile: unknown; dbFirestore: unknown; timeStamp: unknown }
): Promise<boolean> => {
  try {
    // console.log({ currentUserUpdatePrublic: currentUser });
    const { id } = currentProfile;
    //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
    await dbFirestore.collection('profiles').doc(`${id}`).delete();
    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const promote = async (
  _: undefined,
  { input }: { input: PromoteInputType },
  { dbFirestore, slug, FieldValue }:
    { dbFirestore: unknown, slug: unknown, FieldValue: unknown }): Promise<ProfileTypeData | undefined> => {
  const { id, titleSlug, selectionSlug, login } = input
  try {
    await dbFirestore.collection('profiles').doc(id).update({ 'productsPromoted': FieldValue.arrayUnion({ titleSlug, selectionSlug }) })
    try {
      await dbFirestore.collection('products').doc(titleSlug).update({ 'promotedBy': FieldValue.arrayUnion(slug(login)) })
    } catch (error: unknown) {
      throw new Error(error)
    }
  } catch (error: unknown) {
    throw new Error(error)
  }
  try {
    const profileDocRef = await dbFirestore.collection('profiles').doc(id)
    const snapshot = await profileDocRef.get()
    if (snapshot.exists) {

      return snapshot.data()
    } else {
      throw new Error('Cant get profile data with promoted product')
    }
  } catch (error) {
    throw new Error('Cant get profile data with promoted product')
  }
}


const studsEnrollment = async (
  _: undefined,
  { input }: { input: StudsEnrollmentInput },
  { dbFirestore, slug, ViewerModel, FieldValue }:
    { dbFirestore: unknown, slug: unknown, ViewerModel: unknown, FieldValue: unknown }):
  Promise<ProfileTypeData | undefined> => {
  const { viewer, price, title, id, email, login, description } = input
  try {
    await dbFirestore.collection('profiles').doc(id).update({
      'liisEnrollment': FieldValue.arrayUnion({
        title,
        viewer, price, description
      })
    })
    try {
      await ViewerModel.findOneAndUpdate({ email }, {
        $addToSet: {
          studs: {
            id, slugLogin: slug(login)
          }
        }
      }, { new: true })
    } catch (error: unknown) {
      throw new Error(error)
    }

  } catch (error: unknown) {
    throw new Error(error)
  }
  try {
    const profileDocRef = await dbFirestore.collection('profiles').doc(id)
    const snapshot = await profileDocRef.get()
    if (snapshot.exists) {

      return snapshot.data()
    } else {
      throw new Error('Cant get profile data with promoted product')
    }
  } catch (error) {
    throw new Error('Cant get profile data with promoted product')
  }
}

const addAffiliation = async (
  _: undefined,
  { input }: { input: AddDiscountTokenInput },
  { dbFirestore, ViewerModel, }:
    { dbFirestore: unknown, slug: unknown, ViewerModel: unknown, }):
  Promise<ProfileTypeData | undefined> => {
  const { token, affiliator, id, email, role } = input
  console.log({ role })
  try {
    const viewer = await ViewerModel.findOne({ email: affiliator }, '-password').lean().exec()
    if (viewer !== null) {
      if (role.includes('USER')) {
        const foundToken = viewer.hundreddiscountspass.filter((dispass: unknown) => dispass.pass === token)
        console.log({ foundToken })
        if (foundToken[0] !== null && foundToken.length === 1) {
          try {
            await dbFirestore.collection('profiles').doc(id).update({
              'affiliate': { token, affiliator },
              'role': role

            })
            ViewerModel.findOne({ email: affiliator }, '-password').lean().exec().then((doc: unknown) => {
              doc.discountProfiles.push({
                token: token, profileEmail: email,
                profileId: id, flag: foundToken[0].flag
              })
              doc.hundreddiscountspass = doc.hundreddiscountspass.filter(
                (disc: unknown) =>
                  disc.pass != token)
              doc.save()
            }).catch((error: unknown) => {
              throw new Error(error)
            })


          } catch (error: unknown) {
            throw new Error(error)
          }
        } else {
          throw new Error('can not find token ')
        }

      } else if (role.includes('LIIS')) {
        const foundToken = viewer.liispass.filter((dispass: unknown) => dispass.pass === token)

        if (foundToken[0]["pass"] !== null && foundToken.length === 1) {
          try {
            await dbFirestore.collection('profiles').doc(id).update({
              'affiliate': { token, affiliator },
              'role': role

            })
            ViewerModel.findOne({ email: affiliator }, '-password').then((doc: unknown) => {
              doc.liismanagerProfiles.push({
                token: token,
                profileEmail: email, profileId: id, flag: foundToken[0].flag
              })
              doc.liispass = doc.liispass.filter((disc: unknown) => {
                console.log(disc.pass)
                console.log(token)
                return disc.pass != token
              })
              doc.save()
            }
            ).catch((error: unknown) => {
              throw new Error(error)
            }
            )
          } catch (error: unknown) {
            throw new Error(error)
          }
        } else {
          throw new Error('can not find token ')
        }

      } else if (role.includes('COLL')) {
        try {
          const foundToken = viewer.collaboratorpass.filter((dispass: unknown) => dispass.pass === token)

          if (foundToken[0] !== null && foundToken.length === 1) {
            try {
              await dbFirestore.collection('profiles').doc(id).update({
                'affiliate': { token, affiliator },
                'role': role
              })

              ViewerModel.findOne({ email: affiliator }, '-password').then((doc: unknown) => {
                doc.collaboratorProfiles.push({
                  token: token, profileEmail: email,
                  profileId: id, flag: foundToken[0].flag
                })
                console.log(doc.collaboratorpass)
                doc.collaboratorpass = doc.collaboratorpass.filter(
                  (disc: unknown) => {
                    console.log(disc.pass)
                    console.log(token)
                    return disc.pass != token
                  })

                doc.save()

              }).catch((error: unknown) => {
                throw new Error(error)
              })
            }
            catch (error: unknown) {
              throw new Error(error)
            }
          } else {
            throw new Error('can not find token ')
          }
        } catch (error: unknown) {
          throw new Error(error)
        }

      }
    } else {
      throw new Error('can not find that affiliator')
    }
  }
  catch (error: unknown) {
    throw new Error(error)
  }
  try {
    const profileDocRef = await dbFirestore.collection('profiles').doc(id)
    const snapshot = await profileDocRef.get()
    if (snapshot.exists) {
      return snapshot.data()
    } else {
      throw new Error('Cant get profile data with promoted product')
    }
  } catch (error) {
    throw new Error('Cant get profile data with promoted product')
  }
}

const Profile = {
  _id: async (profile: ProfileTypeData): Promise<unknown> => {
    try {
      // console.log({ currentUserUpdatePrublic: currentUser });
      const { _id } = profile;
      //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
      return _id;
    } catch (error: unknown) {
      // console.error(error);
      throw new Error(error);
    }
  },
};
// eslint-disable-next-line no-undef
/* const removeAvatar = async (
  _: undefined,
  { input }: { input: { public_id: string } },
  { cloudinary }: { cloudinary: unknown }
): Promise<any> => {
  try {
    console.log({ input });
    // console.log({ currentUserUpdatePrublic: currentUser });
    //const { uid } = currentProfile;
    //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
    cloudinary.uploader.destroy(input['public_id'], (error: unknown, result: unknown) => {
      if (error) return { error, ok: false };
      return { result, ok: true };
    });

    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

 */
module.exports = {
  DateTime: DateTimeResolver,
  Profile,
  Query: {
    profile,
    profiles,

  },
  Mutation: {
    addProfile,
    updateProfile,
    sendMessage,
    removeProfile,
    promote,
    studsEnrollment,
    addAffiliation
  },
};
