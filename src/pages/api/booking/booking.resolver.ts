import { BookingTypeData, AddBookingInput } from './booking.types'

export const booking = async (
  _: undefined,
  { viewer }: { viewer: string },
  { BookingModel }: { BookingModel: unknown }
): Promise<BookingTypeData | undefined> => {
  try {

    //  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
    //checkUserRole(user, ['VIEWER', 'ADMIN', 'PROF'])
    const booking = await BookingModel.findOne({ viewer: viewer }).lean().exec();
    // console.log({ ...viewer, _id: viewer._id.toString() })
    return booking
  } catch (error: unknown) {
    throw new Error(error);
  }
};


const bookings = async (
  _: undefined,
  __: undefined,
  { BookingModel }: { BookingModel: unknown, }
): Promise<BookingTypeData[] | undefined> => {
  try {

    const bookings = await BookingModel.find({}).lean().exec();
    return bookings
  } catch (error: unknown) {
    console.log({ error });
    throw new Error(error);
  }
};



//Mutations
const addBooking = async (_: undefined,
  { input }: { input: AddBookingInput },
  { BookingModel }: {
    BookingModel: unknown
  }):
  Promise<BookingTypeData | undefined> => {
  try {
    const { profileId, cart, bookingStartDate, bookingEndDate, amountPaid, paymentInfo, paidDate } = input;
    const bookingData = {
      profileId, cart, bookingStartDate, bookingEndDate,
      amountPaid, paymentInfo, paidDate
    };


    const existingProfile = await BookingModel.findOne({
      profileId: profileId
    }).lean().exec();
    if (existingProfile) {
      console.log('there is registred booking');
      if (existingProfile['cart'] === cart) {

        throw new Error('you have already book a date booked');
      }
    }
    const newBooking = new BookingModel({ ...bookingData });
    const savedBooking = await newBooking.save();
    if (savedBooking) {
      return savedBooking
    } else {
      throw new Error(`can t save your booking`)
    }
  } catch (error: unknown) {
    console.log({ Error });
    throw new Error(error);
  }
}

/* 
const updateBooking = async (
  _: undefined,
  { input }: { input: UpdateBookingInput },
  { BookingModel }:
    {
      BookingModel: unknown
    }): Promise<BookingTypeData | undefined> => {
  try {
    const { id, ...rest } = input
    const savedBooking = await BookingModel.findOneAndUpdate({ _id: id }, { rest })
      .lean()
      .exec();
    if (savedBooking) {
      return savedBooking
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};
*/
const removeBooking = async (
  _: undefined,
  { id }: { id: string },
  { BookingModel }: { BookingModel: unknown }
): Promise<boolean> => {
  try {
    await BookingModel.findOneAndRemove({ _id: id });
    return true;
  } catch (error: unknown) {
    // console.error(error);
    throw new Error(error);
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  Query: {
    booking,
    bookings
  },
  Mutation: {
    addBooking,
    removeBooking,
  },
};
