import { DateTimeResolver } from 'graphql-scalars';
import {
  AddViewerInput, AddViewerOutput, UpdateViewerInput, CardBackInput,
  SigninViewerInput, ViewerTypeData, UpdateViewerAddressInput,
  ConnectPayoutInput, EnrollmentInput, EnrollmentType, GetDiscountInput,
  DiscountProductType, RemoveEnrollmentInput, LiisPassType, RegisterEventInput,
} from './viewer.types';
import { SendMessageInput, AddConversationFeedInput, DeleteConversationFeedInput } from '@/api/profile/profile.types'
import QRCode from 'qrcode'
export const viewer = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: unknown }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel.findOne({
      email
    }).lean().exec();
    return viewer
  } catch (error: unknown) {
    throw new Error(error);
  }
};

export const viewerById = async (
  _: undefined,
  { id }: { id: string },
  { ViewerModel }: { ViewerModel: unknown }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel.findOne({
      _id: id
    }).lean().exec();
    return { ...viewer, _id: viewer._id }
  } catch (error: unknown) {
    throw new Error(error);
  }
};


export const enrollmentByEmail = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: unknown }
): Promise<Array<EnrollmentType> | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('enrollmentAll').lean().exec();
    return enrollments
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const viewers = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: unknown }
): Promise<ViewerTypeData[] | undefined> => {
  try {
    const viewers = await ViewerModel.find({}).limit(50).lean().exec();
    return viewers
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};


const frontcollaborators = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: unknown }
): Promise<ViewerTypeData[] | undefined> => {
  try {


    const collaborators = await ViewerModel.find({ role: { $in: ['COLL', 'ORGA', 'LIIS'] } }).lean().exec();
    return collaborators
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};


export const signinViewer = async (_: undefined, { input }: { input: SigninViewerInput },
  { ViewerModel }: {
    ViewerModel: unknown,
  }):
  Promise<ViewerTypeData | undefined> => {
  try {
    const { email } = input;

    const viewerExist = await ViewerModel.findOne({
      email
    }).lean().exec();
    if (!viewerExist) {
      throw new Error('Wrong email or password.')
    }

    return { ...viewerExist, _id: viewerExist._id }
    // const { email, login, _id } = viewerExist;
    /* const viewerdataToken = Object.assign({}, { login, email, id: _id.toString() });
    const token = createToken(viewerdataToken);
    await storeRefreshToken(token, viewerdataToken.id); */




  } catch (error: unknown) {
    throw new Error(` ${error.message}`)
  }
}


//Mutations
const addViewer = async (_: undefined, { input }: { input: AddViewerInput },
  { ViewerModel, hashPassword, }: {
    ViewerModel: unknown, res: unknown, verifyPassword: unknown, hashPassword: unknown, createToken: unknown,
    getDatePlusOneWeek: unknown, getRefreshToken: unknown,
    storeRefreshToken: unknown, oneWeek: unknown
  }):
  Promise<AddViewerOutput | undefined> => {
  try {
    const { login, email, uid, phone, role, name, destination, building, street, city, state, country, zip, contact } = input;
    console.log(input)
    const viewerData = {
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
    const existingViewer = await ViewerModel.findOne({
      email
    }).lean().exec();
    const existingViewerLogin = await ViewerModel.findOne({
      login
    }).lean().exec();
    let savedViewer
    console.log({ existingViewer, existingViewerLogin })
    if (existingViewer && existingViewerLogin) {
      savedViewer = existingViewer
    } else {
      const hashedPassword = await hashPassword(uid)
      const newViewer = new ViewerModel({
        ...viewerData,
        password: hashedPassword
      });
      savedViewer = await newViewer.save();
    }
    if (savedViewer) {

      return { ...savedViewer, _id: savedViewer._id }
    } else {
      throw new Error(`can t save the credential for ${viewerData.login}`)
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
}


const updateViewer = async (
  _: undefined,
  { input }: { input: UpdateViewerInput },
  { ViewerModel }:
    { ViewerModel: unknown }): Promise<ViewerTypeData | undefined> => {
  try {
    const { email, login, bio, phone, role, website, instagram, avatar } = input
    console.log(input)

    const savedViewer = await ViewerModel.findOne({ email }).exec();
    if (savedViewer) {
      console.log({ savedViewer })

      if (login !== null && (typeof login !== 'undefined')) {
        savedViewer.login = login
      }
      if (role !== null && (Array.isArray(role))) {
        savedViewer.role = role
      }
      if (bio !== null && (typeof bio !== 'undefined')) {
        savedViewer.bio = bio.trim()
      }
      if (phone !== null && (typeof phone !== 'undefined')) {
        savedViewer.phone = phone?.trim()
      }
      if (website !== null && (typeof website !== 'undefined')) {
        savedViewer.website = website?.trim()
      }
      if (instagram !== null && (typeof instagram !== 'undefined')) {

        savedViewer.instagram = instagram?.trim()
      } if (avatar !== null && typeof avatar !== 'undefined') {

        savedViewer.avatar = avatar
      }

      try {
        await savedViewer.save()
        const newViewer = await ViewerModel.findById(savedViewer._id).lean().exec()
        const reNewViewer = { ...newViewer, _id: savedViewer._id, avatar: { url: newViewer?.avatar?.url ? newViewer?.avatar?.url : '', public_id: newViewer?.avatar?.public_id ? newViewer.avatar.public_id : '' } }
        console.log({ reNewViewer })
        return reNewViewer
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

const setFlagAvatar = async (
  _: undefined,
  { input: { id, name } }: { input: { name: string, id: string } },
  { ViewerModel }:
    { ViewerModel: unknown }): Promise<ViewerTypeData | undefined> => {
  try {
    console.log({ id, name })

    const savedViewer = await ViewerModel.findOneAndUpdate({ _id: id },
      { flagAvatar: name }, { new: true, upsert: true }).exec();

    if (savedViewer) {
      return { ...savedViewer, _id: savedViewer._id }
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

const registerEvent = async (
  _: undefined,
  { input }: { input: RegisterEventInput },
  { ViewerModel, }:
    {
      ViewerModel: unknown,
    }): Promise<ViewerTypeData | undefined> => {
  try {
    const { email, events } = input;
    console.log({ email, events })
    return ViewerModel.findOne({ email }).then((doc: unknown) => {
      doc.events = events
      console.log({ events: doc.events })

      doc.save()
      return doc
    }).catch((error: unknown) => {
      throw new Error(error)
    })

  } catch (error: unknown) {
    throw new Error(error)

  }
}
const sendMessageViewer = async (
  _: undefined,
  { input }: { input: SendMessageInput },
  { ViewerModel, }:
    {
      ViewerModel: unknown,
    }): Promise<ViewerTypeData | undefined> => {
  try {
    const { sender, content, rec, product, date, token } = input;

    return ViewerModel.findOne({ email: rec }).then((doc: unknown) => {
      doc.messages = [...doc.messages, { token, rec, product, sender, content, date }]
      console.log({ savedMessage: doc.messages })

      doc.save()
      return doc
    }).catch((error: unknown) => {
      throw new Error(error)
    })

  } catch (error: unknown) {
    throw new Error(error)

  }
}
const addConversationFeed = async (
  _: undefined,
  { input }: { input: AddConversationFeedInput },
  { ViewerModel, }:
    {
      ViewerModel: unknown,
    }): Promise<ViewerTypeData | undefined> => {
  try {
    const { email, sender, content, rec, product, date, } = input;
    console.log({ email, sender, content, rec, product, date })

    await ViewerModel.findOne({ email: sender }).then((doc: unknown) => {

      const feedExist = doc.conversationFeed.filter((conversation: unknown) => {
        return (conversation.sender === sender && conversation.product === product)
      })
      const otherFeeds = doc.conversationFeed.filter((conversation: unknown) => {
        return (conversation.sender !== sender && conversation.product !== product)
      })
      console.log({ feedExist })
      console.log({ otherFeeds })
      if (feedExist.length > 0 && otherFeeds.length > 0) {

        doc.conversationFeed = [...otherFeeds, { product, sender, rep: email, messages: [...feedExist[0]['messages'], { content, date, rec }] }]
      } else {
        doc.conversationFeed = [{ product, sender, rep: email, messages: [...feedExist[0]['messages'], { content, date, rec }] }]
      }
      doc.save();
    })

    return await ViewerModel.findOne({ email }).then((doc: unknown) => {

      const feedExist = doc.conversationFeed.filter((conversation: unknown) => {
        return (conversation.sender === sender && conversation.product === product)
      })
      console.log({ feedExist })
      const otherFeeds = doc.conversationFeed.filter((conversation: unknown) => {
        return (conversation.sender !== sender && conversation.product !== product)
      })
      console.log({ otherFeeds })

      if (feedExist.length > 0 && otherFeeds.length > 0) {

        doc.conversationFeed = [...otherFeeds, {
          product, sender, rep: email, messages:
            [...feedExist[0]['messages'], { content, date, rec }]
        }]
      }
      doc.conversationFeed = [...doc.conversationFeed, {
        product, sender, rep: email,
        messages: { content, date, rec }
      }]


      doc.save()
      return doc
    }).catch((error: unknown) => {
      throw new Error(error)
    })



  } catch (error: unknown) {
    throw new Error(error)

  }
}
const deleteConversationFeed = async (
  _: undefined,
  { input }: { input: DeleteConversationFeedInput },
  { ViewerModel, }:
    {
      ViewerModel: unknown,
    }): Promise<ViewerTypeData | undefined> => {
  try {
    const { sender, rec, product } = input;
    console.log({ input })
    return ViewerModel.findOne({ email: sender }).then((doc: unknown) => {
      const otherConversationFeed = doc.conversationFeed.filter((conversation: unknown) => {
        return (conversation.sender !== rec && conversation.product !== product)
      })
      doc.conversationFeed = [...otherConversationFeed]
      doc.save()
      return doc
    }).catch((error: unknown) => {
      throw new Error(error)
    })
  } catch (error: unknown) {
    throw new Error(error)

  }
}
const removeViewer = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel, res, oneWeek }: { oneWeek: unknown, res: unknown, cookies: unknown, ViewerModel: unknown }
): Promise<boolean> => {
  try {
    await ViewerModel.findOneAndRemove({ email });
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
  { ViewerModel }: { ViewerModel: unknown }
): Promise<boolean> => {
  try {
    await ViewerModel.findOneAndRemove({ token: token });
    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};
const updateViewerAddress = async (_: undefined,
  { input }: { input: UpdateViewerAddressInput },
  { ViewerModel }: { ViewerModel: unknown }):
  Promise<ViewerTypeData | undefined> => {
  try {
    const { email, coords, addressGeo, } = input;
    console.log({ coords, addressGeo })

    const doc = await ViewerModel.findOneAndUpdate({ email }, { coords, addressGeo }, { new: true }).lean().exec();
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
  { stripe, ViewerModel, req, absoluteUrl }:
    { ViewerModel: unknown, stripe: unknown, req: unknown, absoluteUrl: unknown, res: unknown }
): Promise<{ link: string } | undefined> => {
  try {
    const { id } = input

    const { origin } = absoluteUrl(req)
    const newOrganisator = await ViewerModel.findById(id).exec()
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

        await ViewerModel.findOneAndUpdate({ _id: id }, {
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
/* 
const accountPayoutStatus = async (
  _: undefined,
  { input }: { input: ConnectPayoutInput },
  { stripe, ViewerModel, }:
    { ViewerModel: unknown, stripe: unknown }
): Promise<ViewerTypeData | undefined> => {
  try {
    const { id } = input


    const viewer = await ViewerModel.findById(id).select('-password').exec()

    const account = stripe.accounts.retrieve(viewer.stripe_account_id)
    if (!account.charges_enabled) {
      throw new Error('anothorized  to get payment from stripe ')
    } else {
      viewer.stripe_seller = account
    }
    return viewer
  } catch (error: unknown) {
    throw new Error(error)
  }
};

 */
const createTenLiisResolver = async (
  _: undefined,
  { id }: { id: string },
  { ViewerModel, createTenLiis }: {
    ViewerModel:
    unknown, createTenLiis: () => [unknown],
  }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {
    console.log({ id })
    const dixliisArray = await createTenLiis()
    const liispass = dixliisArray.map(({ pass, flag }: { pass: string, flag: string }) => (
      { pass: pass, flag: flag, }
    ))
    console.log({ liispass })
    await ViewerModel.findOneAndUpdate({ _id: id }, { liispass: liispass }, { new: true })
    return { success: liispass }
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const createTenCollaboratorResolver = async (
  _: undefined,
  { id }: { id: string, },
  { ViewerModel, createTenLiis }: { ViewerModel: unknown, createTenLiis: () => [unknown] }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {
    console.log({ id })
    const dixliisArray = await createTenLiis()
    const collaboratorpass = dixliisArray.map(({ pass, flag }:
      { pass: string, flag: string }) => (

      { pass, flag }
    ))

    const newViewer = await ViewerModel.findOneAndUpdate({ _id: id }, {
      collaboratorpass: collaboratorpass
    }, { new: true })

    return { success: newViewer.collaboratorpass }
  } catch (error: unknown) {

    throw new Error(error);
  }
};


const createHundredDiscountsResolver = async (
  _: undefined,
  { id }: { id: string, },
  { ViewerModel, createHundredLiis }: { ViewerModel: unknown, createHundredLiis: () => [unknown] }
): Promise<{ success: Array<LiisPassType> } | undefined> => {
  try {

    const hundredliis = await createHundredLiis()
    const discountspass = await hundredliis.map(({ pass, flag }: { pass: string, flag: string }) => (
      { pass: pass, flag: flag }
    ))

    await ViewerModel.findOneAndUpdate({ _id: id }, { hundreddiscountspass: discountspass }, { new: true })

    return { success: discountspass }
  } catch (error: unknown) {

    throw new Error(error);
  }
};

const cardBackRegiser = async (
  _: undefined,
  { input }: { input: CardBackInput },
  { ViewerModel }: { ViewerModel: unknown }
): Promise<ViewerTypeData | undefined> => {
  try {
    console.log({ input })
    const { card, id } = input

    const viewer = await ViewerModel.findOneAndUpdate({ _id: id }, { cardBack: card }, { new: true })

    return viewer
  } catch (error: unknown) {

    throw new Error(error);
  }
};


const addEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { ViewerModel, }: { ViewerModel: unknown, }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    const { id, title, description, price, image, max, startDate, endDate, enrollmentStatus } = input

    const viewer = await ViewerModel.findOne({ _id: id }).exec()
    if (viewer && viewer.enrollmentAll && Array.isArray(viewer.enrollmentAll) && viewer.enrollmentAll.length < 3) {
      viewer.enrollmentAll = [...viewer.enrollmentAll,
      { title, description, price, max, image, startDate, endDate, enrollmentStatus }]
      await viewer.save()
      return { success: viewer.enrollmentAll }
    } else if (Array.isArray(viewer.enrollmentAll)) {
      viewer.enrollmentAll.shift()
      viewer.enrollmentAll.push({ title, description, price, max, image, startDate, endDate, enrollmentStatus })

      await viewer.save()
      return { success: viewer.enrollmentAll }
    } else {
      viewer.enrollmentAll = [{ title, description, price, max, image, startDate, endDate, enrollmentStatus }]
      await viewer.save()
      return { success: viewer.enrollmentAll }
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};
const updateEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { ViewerModel, slug }: { ViewerModel: unknown, slug: unknown }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    console.log({ input })
    const { id, title, description, price, max, image } = input

    const viewer = await ViewerModel.findOne({ _id: id }).exec()
    if (viewer && viewer.enrollmentAll.length < 3) {
      const otherEnrol = viewer.enrollmentAll.filter((enrol: unknown) => slug(enrol.title) !== slug(title))
      if (otherEnrol.length > 0) {
        viewer.enrollmentAll = [...otherEnrol, { title, description, price, max, image }]
        await viewer.save()
        return { success: viewer.enrollmentAll }
      } else {
        viewer.enrollmentAll = [{ title, description, price, max, image }]
        await viewer.save()
        return { success: viewer.enrollmentAll }

      }
    } else {

      viewer.enrollmentAll.shift()
      viewer.enrollmentAll.push({ title, description, price, max, image })
      await viewer.save()
      return { success: viewer.enrollmentAll }
    }
  } catch (error: unknown) {

    throw new Error(error);
  }
};
const removeEnrollment = async (
  _: undefined,
  { input }: { input: RemoveEnrollmentInput },
  { ViewerModel, slug }: { ViewerModel: unknown, slug: unknown }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    const { id, title } = input
    console.log({ input })
    const viewer = await ViewerModel.findOne({ _id: id }).exec()
    let otherEnrol = null
    title.forEach(titleSlug => {
      otherEnrol = viewer.enrollmentAll.filter((enrol: unknown) => slug(enrol.title) !== titleSlug)
    })
    if (otherEnrol && (Array.isArray(otherEnrol) && (otherEnrol && otherEnrol?.length > 0))) {
      viewer.enrollmentAll = otherEnrol
      await viewer.save()
      return { success: viewer.enrollmentAll }
    } else {
      viewer.enrollmentAll = null
      await viewer.save()
      return { success: viewer.enrollmentAll }
    }
  } catch (error: unknown) {
    throw new Error(error);
  }
};
const getDiscountProducts = async (
  _: undefined,
  { input }: { input: GetDiscountInput },
  { ViewerModel, }: { ViewerModel: unknown, }
): Promise<{ discounted: DiscountProductType[] | null } | undefined> => {
  try {
    console.log({ input })
    const { affiliate, discountToken } = input

    const viewer = await ViewerModel.findOne({ _id: affiliate }).exec()
    if (viewer && viewer.discountspass.filter((discpass: unknown) => discpass.pass === discountToken).length > 0) {


      const discounted = viewer.discountProducts.map((disc: unknown) => {
        const discountedTitle = viewer.products.filter((prod: string) => {
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


const Viewer = {
  loginSlug: async (viewer: ViewerTypeData, _: undefined, { slug }: { slug: unknown }): Promise<string | undefined> => {

    return slug(viewer.login)
  },
  hasWallet: (viewer: ViewerTypeData): boolean | undefined => {
    return viewer.stripe_account_id ? true : false
  }
}
// eslint-disable-next-line no-undef
module.exports = {
  DateTime: DateTimeResolver,
  Viewer,
  Query: {
    viewer,
    viewerById,
    viewers,
    frontcollaborators,
    enrollmentByEmail,
    getQrCode,
    getDiscountProducts,

  },
  Mutation: {
    addViewer,
    updateViewer,
    setFlagAvatar,
    sendMessageViewer,
    addConversationFeed,
    deleteConversationFeed,
    updateViewerAddress,
    removeViewer,
    removeToken,
    createTenLiisResolver,
    createTenCollaboratorResolver,
    createHundredDiscountsResolver,
    addEnrollment,
    updateEnrollment,
    removeEnrollment,
    connectPayout,
    cardBackRegiser,
    registerEvent
  },
};
