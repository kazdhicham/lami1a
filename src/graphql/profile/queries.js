import { gql } from '@apollo/client';


export const PROFILES = gql`
  query Profiles {
    profiles {
      _id
      login
      biography
      email
      avatar{
        url
        public_id
      }
      role
      website
      isAdmin

    }
  }
`;
export const PROFILE = gql`
  query Profile($id: String) {
    profile(id: $id) {
      _id
      login
      email
      role
      address{
        name
        destination
        building
        street
        city
        state
        country
        contact
        zip
      }
      phone
    affiliate{
      token
      affiliator
    }
    enrollments {
      title
      viewer
      price
      dateStart
      dateEnd
    }
      messages {
        rec
        date
        content
      }
      
    }
  }
`;
