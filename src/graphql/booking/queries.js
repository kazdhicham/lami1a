//import { gql } from "react-query";
import { gql } from '@apollo/client';

export const GET_BOOKING = gql`
  query Booking($viewer: String) {
    booking(viewer: $titleSlug) {
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

export const GET_BOOKINGS = gql`
  query Bookings {
    bookings {
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
