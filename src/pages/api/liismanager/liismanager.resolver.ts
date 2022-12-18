import { DateTimeResolver } from 'graphql-scalars';
import {
  AddLiismanagerInput, AddLiismanagerOutput, UpdateLiismanagerInput,
  SigninLiismanagerInput, LiismanagerTypeData, UpdateLiismanagerAddressInput,
  ConnectPayoutInput, EnrollmentInput, EnrollmentType, GetDiscountInput,
  DiscountProductType, RemoveEnrollmentInput, LiisPassType
} from './liismanager.types';
import { SendMessageType } from '@/api/profile/profile.types'
import QRCode from 'qrcode'



export const liismanager = async (
  _: undefined,
  { email }: { email: string },
  { LiismanagerModel }: { LiismanagerModel: unknown }
): Promise<LiismanagerTypeData | undefined> => {
  try {
    const liismanager = await LiismanagerModel.findOne({
      email
    }).lean().exec();
    return liismanager
  } catch (error: unknown) {
    throw new Error(error);
  }
};

export const liismanagerById = async (
  _: undefined,
  { id }: { id: string },
  { LiismanagerModel }: { LiismanagerModel: unknown }
): Promise<LiismanagerTypeData | undefined> => {
  try {
    const liismanager = await LiismanagerModel.findOne({
      _id: id
    }).lean().exec();
    return { ...liismanager, _id: liismanager._id }
  } catch (error: unknown) {
    throw new Error(error);
  }
};


export const enrollmentByEmail = async (
  _: undefined,
  { email }: { email: string },
  { LiismanagerModel }: { LiismanagerModel: unknown }
): Promise<Array<EnrollmentType> | undefined> => {
  try {
    const enrollments = await LiismanagerModel.findOne({
      email
    }).select('enrollmentAll').lean().exec();
    return enrollments
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const liismanagers = async (
  _: undefined,
  __: undefined,
  { LiismanagerModel }: { LiismanagerModel: unknown }
): Promise<LiismanagerTypeData[] | undefined> => {
  try {
    const liismanagers = await LiismanagerModel.find({}).limit(50).lean().exec();
    return liismanagers
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};




export const signinLiismanager = async (_: undefined, { input }: { input: SigninLiismanagerInput },
  { LiismanagerModel }: {
    LiismanagerModel: unknown,
  }):
  Promise<LiismanagerTypeData | undefined> => {
  try {
    const { email } = input;

    const liismanagerExist = await LiismanagerModel.findOne({
      email
    }).lean().exec();
    if (!liismanagerExist) {
      throw new Error('Wrong email or password.')
    }

    return { ...liismanagerExist, _id: liismanagerExist._id }
    // const { email, login, _id } = liismanagerExist;
    /* const liismanagerdataToken = Object.assign({}, { login, email, id: _id.toString() });
    const token = createToken(liismanagerdataToken);
    await storeRefreshToken(token, liismanagerdataToken.id); */




  } catch (error: unknown) {
    throw new Error(` ${error.message}`)
  }
}


//Mutations
const addLiismanager = async (_: undefined, { input }: { input: AddLiismanagerInput },
  { LiismanagerModel, hashPassword, }: {
    LiismanagerModel: unknown, res: unknown, verifyPassword: unknown, hashPassword: unknown, createToken: unknown,
    getDatePlusOneWeek: unknown, getRefreshToken: unknown,
    storeRefreshToken: unknown, oneWeek: unknown
  }):
  Promise<AddLiismanagerOutput | undefined> => {
  try {
    const { login, email, uid, phone, role, name, destination, building, street, city, state, country, zip, contact } = input;
    console.log(input)
    const liismanagerData = {
      login,
      email,
      phone,
      role,
      isAdmin: false,
      address: {
        name,
        destination,
        building,
        street,
        city,
        state,
        country,
        zip,
        contact,
        isdefault: false
      }

    };
    const existingLiismanager = await LiismanagerModel.findOne({
      email
    }).lean().exec();
    const existingLiismanagerLogin = await LiismanagerModel.findOne({
      login
    }).lean().exec();
    let savedLiismanager
    console.log({ existingLiismanager, existingLiismanagerLogin })
    if (existingLiismanager && existingLiismanagerLogin) {
      savedLiismanager = existingLiismanager
    } else {
      const hashedPassword = await hashPassword(uid)
      const newLiismanager = new LiismanagerModel({
        ...liismanagerData,
        password: hashedPassword
      });
      savedLiismanager = await newLiismanager.save();
    }
    if (savedLiismanager) {

      return { ...savedLiismanager, _id: savedLiismanager._id }
    } else {
      throw new Error(`can t save the credential for ${liismanagerData.login}`)
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
}


const updateLiismanager = async (
  _: undefined,
  { input }: { input: UpdateLiismanagerInput },
  { LiismanagerModel }:
    { LiismanagerModel: unknown }): Promise<LiismanagerTypeData | undefined> => {
  try {
    const { email, login, bio, phone, role, website, instagram, avatar } = input
    console.log(input)

    const savedLiismanager = await LiismanagerModel.findOne({ email }).exec();
    if (savedLiismanager) {
      console.log({ savedLiismanager })

      if (login !== null && (typeof login !== 'undefined')) {
        savedLiismanager.login = login
      }
      if (role !== null && (Array.isArray(role))) {
        savedLiismanager.role = role
      }
      if (bio !== null && (typeof bio !== 'undefined')) {
        savedLiismanager.bio = bio.trim()
      }
      if (phone !== null && (typeof phone !== 'undefined')) {
        savedLiismanager.phone = phone?.trim()
      }
      if (website !== null && (typeof website !== 'undefined')) {
        savedLiismanager.website = website?.trim()
      }
      if (instagram !== null && (typeof instagram !== 'undefined')) {

        savedLiismanager.instagram = instagram?.trim()
      } if (avatar !== null && typeof avatar !== 'undefined') {

        savedLiismanager.avatar = avatar
      }

      try {
        await savedLiismanager.save()
        const newLiismanager = await LiismanagerModel.findById(savedLiismanager._id).lean().exec()
        const reNewLiismanager = { ...newLiismanager, _id: savedLiismanager._id, avatar: { url: newLiismanager?.avatar?.url ? newLiismanager?.avatar?.url : '', public_id: newLiismanager?.avatar?.public_id ? newLiismanager.avatar.public_id : '' } }
        console.log({ reNewLiismanager })
        return reNewLiismanager
      } catch (error: unknown) {
        throw new Error(error);
      }
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const setFlag = async (
  _: undefined,
  { input: { id, name } }: { input: { name: string, id: string } },
  { LiismanagerModel }:
    { LiismanagerModel: unknown }): Promise<LiismanagerTypeData | undefined> => {
  try {
    console.log({ id, name })

    const savedLiismanager = await LiismanagerModel.findOneAndUpdate({ _id: id },
      { flagAvatar: name }, { new: true, upsert: true }).exec();

    if (savedLiismanager) {
      return { ...savedLiismanager, _id: savedLiismanager._id }
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const sendMessageLiismanager = async (
  _: undefined,
  { input }: { input: SendMessageType },
  { LiismanagerModel, }:
    {
      LiismanagerModel: unknown,
    }): Promise<LiismanagerTypeData | undefined> => {
  try {
    const { sender, content, id, rec, product } = input;
    console.log({ sender, content, id, rec, product })
    const savedLiismanager = await LiismanagerModel.findOne({ email: rec }).lean().exec()
    savedLiismanager.messages = [...savedLiismanager.messages, { id, rec, product, sender, content, date: new Date() }]
    console.log(savedLiismanager.messages)

    return savedLiismanager
  } catch (error: unknown) {
    throw new Error(error)
  }
}
const removeLiismanager = async (
  _: undefined,
  { email }: { email: string },
  { LiismanagerModel, res, oneWeek }: { oneWeek: unknown, res: unknown, cookies: unknown, LiismanagerModel: unknown }
): Promise<boolean> => {
  try {
    await LiismanagerModel.findOneAndRemove({ email });
    res.clearCookie('token', {
      httpOnly: true,
      maxAge: oneWeek
    })
    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const removeToken = async (
  _: undefined,
  { token }: { token: string },
  { LiismanagerModel }: { LiismanagerModel: unknown }
): Promise<boolean> => {
  try {
    await LiismanagerModel.findOneAndRemove({ token: token });
    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};
const updateLiismanagerAddress = async (_: undefined,
  { input }: { input: UpdateLiismanagerAddressInput },
  { LiismanagerModel }: { LiismanagerModel: unknown }):
  Promise<LiismanagerTypeData | undefined> => {
  try {
    const { email, coords, addressGeo, } = input;
    console.log({ coords, addressGeo })

    const doc = await LiismanagerModel.findOneAndUpdate({ email }, { coords, addressGeo }, { new: true }).lean().exec();
    try {
      console.log({ doc })
      return doc
    } catch (error: unknown) {
      throw new Error(error)
    }

  } catch (error: unknown) {
    throw new Error(error);
  }
}

const connectPayout = async (
  _: undefined,
  { input }: { input: ConnectPayoutInput },
  { stripe, LiismanagerModel, req, absoluteUrl }:
    { LiismanagerModel: unknown, stripe: unknown, req: unknown, absoluteUrl: unknown, res: unknown }
): Promise<{ link: string } | undefined> => {
  try {
    const { id } = input

    const { origin } = absoluteUrl(req)
    const newOrganisator = await LiismanagerModel.findById(id).exec()
    if (!newOrganisator.strip_account_id) {
      let account
      try {
        console.log('dans strip')
        account = await stripe.accounts.create({ type: 'express' });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${origin}/organisators/${id}`,
          return_url: `${origin}/organisators/${id}`,
          type: 'account_onboarding',
        });

        await LiismanagerModel.findOneAndUpdate({ _id: id }, {
          stripe_account_id: account.id,
          stripe_link: accountLink['url']
        }, { new: true })

        return { link: accountLink['url'] }
      } catch (error: unknown) {
        throw new Error(error)
      }

    }
  } catch (error: unknown) {
    throw new Error(error)
  }
};

/* const accountPayoutStatus = async (
  _: undefined,
  { input }: { input: ConnectPayoutInput },
  { stripe, LiismanagerModel, }:
    { LiismanagerModel: unknown, stripe: unknown }
): Promise<LiismanagerTypeData | undefined> => {
  try {
    const { id } = input


    const liismanager = await LiismanagerModel.findById(id).select('-password').exec()

    const account = stripe.accounts.retrieve(liismanager.stripe_account_id)
    if (!account.charges_enabled) {
      throw new Error('anothorized  to get payment from stripe ')
    } else {
      liismanager.stripe_seller = account
    }
    return liismanager
  } catch (error: unknown) {
    throw new Error(error)
  }
};

 */
const createTenLiisResolver = async (
  _: undefined,
  { id }: { id: string },
  { LiismanagerModel, createTenLiis }: {
    LiismanagerModel: unknown, createTenLiis: () => [unknown],
  }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {
    console.log({ id })
    const dixliisArray = await createTenLiis()
    const liispass = dixliisArray.map(({ pass, flag }: { pass: string, flag: string }) => (
      { pass: pass, flag: flag, }
    ))
    console.log({ liispass })
    await LiismanagerModel.findOneAndUpdate({ _id: id }, { liispass: liispass }, { new: true })
    return { success: liispass }
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const createTenCollaboratorResolver = async (
  _: undefined,
  { id }: { id: string, },
  { LiismanagerModel, createTenLiis }: { LiismanagerModel: unknown, createTenLiis: () => [unknown] }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {
    console.log({ id })
    const dixliisArray = await createTenLiis()
    const collaboratorpass = dixliisArray.map(({ pass, flag }:
      { pass: string, flag: string }) => (

      { pass, flag }
    ))

    const newLiismanager = await LiismanagerModel.findOneAndUpdate({ _id: id }, {
      collaboratorpass: collaboratorpass
    }, { new: true })

    return { success: newLiismanager.collaboratorpass }
  } catch (error: unknown) {

    throw new Error(error);
  }
};


const createHundredDiscountsResolver = async (
  _: undefined,
  { id }: { id: string, },
  { LiismanagerModel, createHundredLiis }: { LiismanagerModel: unknown, createHundredLiis: () => [unknown] }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {

    const hundredliis = await createHundredLiis()
    const discountspass = await hundredliis.map(({ pass, flag }: { pass: string, flag: string }) => (
      { pass: pass, flag: flag }
    ))

    await LiismanagerModel.findOneAndUpdate({ _id: id }, { hundreddiscountspass: discountspass }, { new: true })

    return { success: discountspass }
  } catch (error: unknown) {

    throw new Error(error);
  }
};



const addEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { LiismanagerModel, }: { LiismanagerModel: unknown, }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    const { id, title, description, price, image, max, startDate, endDate, enrollmentStatus } = input

    const liismanager = await LiismanagerModel.findOne({ _id: id }).exec()
    if (liismanager && liismanager.enrollmentAll && Array.isArray(liismanager.enrollmentAll) && liismanager.enrollmentAll.length < 3) {
      liismanager.enrollmentAll = [...liismanager.enrollmentAll,
      { title, description, price, max, image, startDate, endDate, enrollmentStatus }]
      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    } else if (Array.isArray(liismanager.enrollmentAll)) {
      liismanager.enrollmentAll.shift()
      liismanager.enrollmentAll.push({ title, description, price, max, image, startDate, endDate, enrollmentStatus })

      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    } else {
      liismanager.enrollmentAll = [{ title, description, price, max, image, startDate, endDate, enrollmentStatus }]
      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};
const updateEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { LiismanagerModel, slug }: { LiismanagerModel: unknown, slug: unknown }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    console.log({ input })
    const { id, title, description, price, max, image } = input

    const liismanager = await LiismanagerModel.findOne({ _id: id }).exec()
    if (liismanager && liismanager.enrollmentAll.length < 3) {
      const otherEnrol = liismanager.enrollmentAll.filter((enrol: unknown) => slug(enrol.title) !== slug(title))
      if (otherEnrol.length > 0) {
        liismanager.enrollmentAll = [...otherEnrol, { title, description, price, max, image }]
        await liismanager.save()
        return { success: liismanager.enrollmentAll }
      } else {
        liismanager.enrollmentAll = [{ title, description, price, max, image }]
        await liismanager.save()
        return { success: liismanager.enrollmentAll }

      }
    } else {

      liismanager.enrollmentAll.shift()
      liismanager.enrollmentAll.push({ title, description, price, max, image })
      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};
const removeEnrollment = async (
  _: undefined,
  { input }: { input: RemoveEnrollmentInput },
  { LiismanagerModel, slug }: { LiismanagerModel: unknown, slug: unknown }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    const { id, title } = input
    console.log({ input })
    const liismanager = await LiismanagerModel.findOne({ _id: id }).exec()
    let otherEnrol = null
    title.forEach(titleSlug => {
      otherEnrol = liismanager.enrollmentAll.filter((enrol: unknown) => slug(enrol.title) !== titleSlug)
    })
    if (otherEnrol && (Array.isArray(otherEnrol) && (otherEnrol && otherEnrol?.length > 0))) {
      liismanager.enrollmentAll = otherEnrol
      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    } else {
      liismanager.enrollmentAll = null
      await liismanager.save()
      return { success: liismanager.enrollmentAll }
    }
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const getDiscountProducts = async (
  _: undefined,
  { input }: { input: GetDiscountInput },
  { LiismanagerModel, }: { LiismanagerModel: unknown, }
): Promise<{ discounted: DiscountProductType[] | null } | undefined> => {
  try {
    console.log({ input })
    const { affiliate, discountToken } = input

    const liismanager = await LiismanagerModel.findOne({ _id: affiliate }).exec()
    if (liismanager && liismanager.discountspass.filter((discpass: unknown) => discpass.pass === discountToken).length > 0) {


      const discounted = liismanager.discountProducts.map((disc: unknown) => {
        const discountedTitle = liismanager.products.filter((prod: string) => {
          prod === disc.title
        })
        if (discountedTitle.length > 0) {
          return { title: disc.title, stock: disc.stock }
        }
      })
      return { discounted }
    } else {
      return { discounted: null }
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};
const getQrCode = async (
  _: undefined,
  { url }: { url: string }): Promise<{ qrCodeUrl: string } | undefined> => {
  try {
    console.log({ url })
    const qrCodeUrl = await QRCode.toDataURL(url)
    console.log({ qrCodeUrl })
    return {
      qrCodeUrl
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};

const Liismanager = {
  loginSlug: async (liismanager: LiismanagerTypeData, _: undefined, { slug }: { slug: unknown }): Promise<string | undefined> => {

    return slug(liismanager.login)
  },
  hasWallet: (liismanager: LiismanagerTypeData): boolean | undefined => {
    return liismanager.stripe_account_id ? true : false
  }
}
// eslint-disable-next-line no-undef
module.exports = {
  DateTime: DateTimeResolver,
  Liismanager,
  Query: {
    liismanager,
    liismanagerById,
    liismanagers,

    enrollmentByEmail,
    getQrCode,
    getDiscountProducts,

  },
  Mutation: {
    addLiismanager,
    updateLiismanager,
    setFlag,
    sendMessageLiismanager,
    updateLiismanagerAddress,
    removeLiismanager,
    removeToken,
    createTenLiisResolver,
    createTenCollaboratorResolver,
    createHundredDiscountsResolver,
    addEnrollment,
    updateEnrollment,
    removeEnrollment,
    connectPayout,


  },
};
