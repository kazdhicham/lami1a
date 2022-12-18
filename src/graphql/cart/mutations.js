import { gql } from '@apollo/client';

export const ADD_ADDRESS = gql`
mutation AddAddress($input: AddressInput) {
    addAddress(input: $input) {
      title
      description
      image{
        url
      }
      author
      status
    }
  }
`;
export const EDIT_ADDRESS = gql`
  mutation EdirAddress($titleSlug: String, $input: AddressInput) {
    editAddress(titleSlug: $titleSlug, input: $input) {
      title
      description
      image
      author
      selectionStatus
      products {
        id
        title
        image
        description
      }
    }
  }
`;
export const CHECKOUT_SESSION = gql`
  mutation CheckoutSession($input:CheckoutInput) {
    checkoutSession(input:$input) {
    sessionId
    url
  }
}
`;

export const SET_STEP = gql`
  mutation SetStep($num: Int) {
    setStep(num: $num)
  }
`;
export const SET_PAYMENT = gql`
  mutation SetPayment($num: Int) {
    setPayment(num: $num)
  }
`;

