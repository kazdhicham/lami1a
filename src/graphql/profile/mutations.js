import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation AddProfile($input: AddProfileInput) {
    addProfile(input: $input) {
      _id
      email
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput) {
    updateProfile(input: $input) {
      email
      login
      phone
      role
     address{
       name
      destination
     destination
    building
    street
    city
    state
    country
    contact
    zip
    isdefault}
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input:SendMessageInput ) {
    sendMessage(input: $input) {
    messages{
    rec
    content
    product
}    }
  }
`;

export const PROMOTE = gql`
  mutation Promote($input:PromoteInput ) {
    promote(input: $input) {
      productsPromoted {
        titleSlug
        selectionSlug
      }
    }
  }
`;

export const ADD_AFFILIATION = gql`
  mutation AddAffiliation($input: AddAffiliationInput) {
    addAffiliation(input: $input) {
       affiliate {
        token
        affiliator
      }
  }
}
`;


export const REMOVE_PROFILE = gql`
  mutation RemoveProfile {
    removeProfile
  }
`;
