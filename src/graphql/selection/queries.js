//import { gql } from "react-query";
import { gql } from '@apollo/client';

export const GET_SELECTION = gql`
  query Selection($titleSlug: String) {
    selection(titleSlug: $titleSlug) {
      titleSlug
      title
      description
      author
      promote
      status
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        image {
          url
        }
        promo
        description
        stock
        price
        rate
        productStatus
      }
    }
  }
`;

export const GET_SELECTIONS = gql`
  query Selections {
    selections {
      titleSlug
      title
      description
      status
      author
      image {
        url
        public_id
      }
      products {
        title
        titleSlug
        image {
          url
        }
        productStatus
      }
    }
  }
`;
export const GET_PRODUCTS = gql`
  query GetProducts($titleSlug: String) {
    getproducts(titleSlug: $titleSlug) {
      title
      titleSlug
      price
      offerPrice
      author
      promotedBy
      stock
      promo
      rate
      quantity
      reviews
      image {
        url
      }
      productStatus
    }
  }
`;

export const SELECTIONS_BY_AUTHOR = gql`
  query SelectionsByAuthor($email: String) {
    selectionsByAuthor(email: $email) {
      _id
      title
      titleSlug
      description
      author
      promote
      createdAt
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        image {
          url
        }
      }
    }
  }
`;

export const GET_FAVORITES = gql`
  query Favorites {
    favorites {
      titleSlug
      title
      description
      author
      image {
        public_id
        url
      }
      products {
        title
        titleSlug
        image {
          url
        }
      }
    }
  }
`;
