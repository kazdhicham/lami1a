import { CartTypeData, CartInput, CheckoutInput, CheckoutOutput } from './cart.types';

const carts = async (_: undefined, { input }: { input: { limit: number, page: number } }, { CartModel }: { CartModel: unknown }):
  Promise<CartTypeData[] | null> => {
  try {
    const { limit = 0, page = 0 } = input;
    let carts: CartTypeData[] | null = [];
    if (page > 0) {
      carts = await CartModel.find({})
        .skip((page - 1) * limit)
        .lean()
        .exec();
    } else {
      carts = await CartModel.find({}).limit(limit).lean().exec();
    }

    return carts;
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};

const cartsViewer = async (_: undefined, { viewer }: { viewer: string }, { CartModel }: { CartModel: unknown }):
  Promise<CartTypeData[] | null> => {
  try {
    let carts: CartTypeData[] | null = [];
    carts = await CartModel.find({ viewer: viewer })
      .lean()
      .exec();
    return carts;
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};

const cart = async (_: undefined, { id }: { id: string }, { CartModel }: { CartModel: unknown }): Promise<CartTypeData | null> => {
  try {
    return await CartModel.findOne({ _id: id }).lean().exec();

  } catch (error: unknown) {
    throw new Error(error)
  }
};

// MUTATIONS
const addCart = async (
  _: undefined,
  { input }: { input: CartInput },
  { CartModel }: { CartModel: unknown }
): Promise<CartTypeData | null> => {
  try {
    console.log({ input })
    const cart = new CartModel(input)
    const newCart = await cart.save()
    return newCart
  } catch (error: unknown) {
    throw new Error(error)
  }
};


const validateCart = async (
  _: undefined,
  { id }: { id: string },
  { CartModel }: { CartModel: unknown }
): Promise<CartTypeData | null> => {
  try {

    const validatedCart = await CartModel.findOneAndUpdate({ _id: id }, { valid: true }, { new: true }).exec();
    return validatedCart
  } catch (error: unknown) {
    throw new Error(error)
  }
};


const removeCart = async (_: undefined, { id }: { id: string }, { CartModel }: { CartModel: unknown }):
  Promise<boolean | null> => {
  try {

    const cartdeleted = await CartModel.findOneAndDelete({ _id: id }, { projection: { _id: 1 }, rawResult: true }).exec();
    console.log({ cartdeleted })
    return true


  } catch (error: unknown) {
    throw new Error(error)
  }
};

const checkoutSession = async (
  _: undefined,
  { input }: { input: CheckoutInput },
  { stripe, CartModel, dbFirestore, req, moment,
    FieldValue, absoluteUrl }:
    { moment: unknown, BookingModel: unknown, absoluteUrl: unknown, ProfileModel: unknown, FieldValue: unknown, dbFirestore: unknown, stripe: unknown, CartModel: unknown, req: unknown, res: unknown }
): Promise<CheckoutOutput | null> => {
  try {
    const { email, cartProducts, delivery, total, profileId } = input
    const { origin } = absoluteUrl(req)
    const titleArray = cartProducts.map(prod => prod.title)
    const productsArray = cartProducts.map(prod => ({ title: prod.title, quantity: prod.quantity, discount: prod.discount, shipping: prod.shipping }))
    const titleJoined = titleArray.join(', ')
    console.log({ input })
    console.log({ cartProducts: input.cartProducts })
    console.log({ origin })
    const timeDifference = moment().utcOffset() / 60
    const starteDateBookingUtc = moment(delivery.startDate).add(timeDifference, 'hours')
    const endDateBookingUtc = moment(delivery.endDate).add(timeDifference, 'hours')
    const customer = await stripe.customers.create({
      email
    })
    console.log({ customer })

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          name: titleJoined,
          amount: total * 100,
          currency: 'eur',
          quantity: 1
        }
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
    });
    const { url, id, } = session
    console.log({ session })
    try {
      const cart = await new CartModel({
        ...input, valid: true,
        checkoutId: id.toString(), delivery: {
          startDate: starteDateBookingUtc,
          endDate: endDateBookingUtc
        }
      })
      await cart.save()

      try {
        const docRef = dbFirestore.collection('profiles').doc(`${profileId}`)
        const profileSnapshot = docRef.get()
        if (profileSnapshot.exists) {
          await docRef.set({
            orders: FieldValue.arrayUnion({
              products: productsArray,
              delivery,
              total,
              date: new Date()
            })
          }, { merge: true })
        } else {
          throw new Error(`cant find Profile ${profileId} in database`);
        }

      } catch (error: unknown) {

        throw new Error(error);
      }
    } catch (error: unknown) {
      throw new Error(error)

    }

    return { url, sessionId: session.id }
  } catch (error: unknown) {
    throw new Error(error)
  }
  /*  try {
     const booking = await new BookingModel({
       profile: profileId, cart: cart,
       bookingStartDate: starteDateBookingUtc, bookingEndDate: endDateBookingUtc,
       amountPaid: total, paymentInfo: { id: id.toString(), status }, paidDate: new Date().toISOString()
     })
     await booking.save()
   } catch (error: unknown) {
     throw new Error(error) */
};

const checkoutSessionOrganisator = async (
  _: undefined,
  { input }: { input: CheckoutInput },
  { stripe, CartModel, absoluteUrl, req, res, moment }:
    { moment: unknown, BookingModel: unknown, ProfileModel: unknown, absoluteUrl: unknown, stripe: unknown, CartModel: unknown, req: unknown, res: unknown }
): Promise<CheckoutOutput | null> => {
  try {

    const { email,  cartProducts, delivery, total,  author_stripe_account_id } = input

    const { origin } = absoluteUrl(req)
    const titleArray = cartProducts.map(prod => prod.title)

    const titleJoined = titleArray.join(', ')

    console.log({ input })
    console.log({ cartProducts: input.cartProducts })
    console.log({ origin })

    const timeDifference = moment().utcOffset() / 60
    const starteDateBookingUtc = moment(delivery.startDate).add(timeDifference, 'hours')
    const endDateBookingUtc = moment(delivery.endDate).add(timeDifference, 'hours')

    const customer = await stripe.customers.create({
      email
    })
    console.log({ customer })
    const fee = (total * 30) / 100
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          name: titleJoined,
          amount: total * 100,
          currency: 'eur',
          quantity: 1
        }

      ],
      /*  , */
      payment_method_types: ['card'],
      // charge Bayer andtransfer remaining balance to seller after fee
      payment_intent_data: {
        application_fee_amount: fee * 100,
        transfer_data: {
          destination: author_stripe_account_id
        }
      },
      mode: 'payment',
      // redirect after
      /*  success_url: `${origin}/checkout/success/${seanceId}`,
       cancel_url: `${origin}/checkout?cancel=true`, */
      customer_email: email,


    });
    const { url, id, } = session


    console.log({ session })
    try {
      const cart = await new CartModel({
        ...input, valid: true,
        checkoutId: id.toString(), delivery: {
          startDate: starteDateBookingUtc,
          endDate: endDateBookingUtc
        }
      })
      await cart.save()

      try {
        // await ProfileModel.findOneAndUpdate({ email }, { stripSession: session }).exec()
      } catch (error: unknown) {
        throw new Error(error)

      }
    } catch (error: unknown) {
      throw new Error(error)
    }
    /*  try {
       const booking = await new BookingModel({
         profile: profileId, cart: cart,
         bookingStartDate: starteDateBookingUtc, bookingEndDate: endDateBookingUtc,
         amountPaid: total, paymentInfo: { id: id.toString(), status }, paidDate: new Date().toISOString()
       })
       await booking.save()
     } catch (error: unknown) {
       throw new Error(error) */



    return { url, sessionId: session.id }
  } catch (err: unknown) {
    res.status(err.statusCode || 500).json(err.message);
    throw new Error(err)

  }
};


const CartResolver = {
  Query: {
    carts,
    cartsViewer,
    cart,
  },
  Mutation: {
    addCart,
    validateCart,
    removeCart,
    checkoutSession,
    checkoutSessionOrganisator,

  },
};
export default CartResolver;
