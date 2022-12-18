import { CartTypeData } from '@/api/cart/cart.types'
export type BookingTypeData = {
  _id?: string;
  profileId: string;
  cart: CartTypeData;
  bookingStartDate: string;
  bookingEndDate: string;
  amountPaid?: number;
  paymentInfo?: PaymentInfoType;
  paidDate?: string;
  createdAt?: string;
};
export type PaymentInfoType = {
  id: string;
  status: string;
};
export type AddBookingInput = {
  profileId: string;
  cart: CartTypeData;
  bookingStartDate: string;
  bookingEndDate: string;
  amountPaid: string;
  paymentInfo: { id: string, status: string };
  paidDate: string;
  createdAt: string;
};
export type UpdateBookingInput = {
  id: string;
  profileId: string;
  cart: CartTypeData;
  bookingStartDate: string;
  bookingEndDate: string;
  amountPaid: string;
  paymentInfo: { id: string, status: string };
  paidDate: string;
  createdAt: string;
}
