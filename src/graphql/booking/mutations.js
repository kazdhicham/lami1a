import { gql } from '@apollo/client';

export const ADD_BOOKING = gql`
mutation AddBooking($input: AddBookingInput) {
    addBooking(input: $input) {
      _id
      viewer
      cart
      bookingStartDate
      bookingEndDate
      amountPaid
      paymentInfo{
        id
        status
      }
      paidDate
    }
  }
`;
export const REMOVE_BOOKING = gql`
  mutation RemoveBooking($id: String) {
    removeBooking(id: $id) {
      _id
      viewer
      cart
      bookingStartDate
      bookingEndDate
      amountPaid
      paymentInfo{
        id
        status
      }
      paidDate
    }
    }
`;
