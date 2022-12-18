import { gql } from '@apollo/client';

export const GET_DOMAINS = gql`
  query Domains {
    domains {
      title
      titleSlug
      viewers {
        login
      }
      city
      country
 
    }
  }
`;

export const GET_DOMAIN = gql`
  query Domain {
    domain {
      title
      titleSlug
      viewers {
        login
      }
      city
      country
     
    }
  }
`;

