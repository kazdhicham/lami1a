export const bookingDefs = `
#scalar type
scalar DateTime
type Booking {
  _id: ID!
  viewerId: String
  cart: Cart
  bookingStartDate: String
  bookingEndDate: String
  amountPaid: Int
  paymentInfo: PaymentInfoType
  paidDate: String
  createdAt: String
  updatedAt: String
}
 
type PaymentInfoType {
  id: String
  status: String
}
input AddBookingInput  {
  viewerId: String
  cart: String
  bookingStartDate: String
  bookingEndDate: String
  amountPaid: String
  paymentInfo: PaymentInfoInput
  paidDate: String
  createdAt: String
 }
 input PaymentInfoInput {
  id: String
  status: String
}

input UpdateBookingInput {
 id:String
  viewerId: String
  cart: String
  bookingStartDate: String
  bookingEndDate: String
  amountPaid: String
  paymentInfo: PaymentInfoInput
  paidDate: String
  createdAt: String
   
}
type Mutation {
    addBooking(input:AddBookingInput):Booking
    removeBooking(id:String):Boolean
    }
  
  type Query {
    booking(viewerId:String): Booking
    bookings: [Booking!]
  }
 
`;
