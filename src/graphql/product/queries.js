import { gql } from '@apollo/client';
export const GET_PRODUCT = gql`
  query Product($titleSlug: String) {
    product(titleSlug: $titleSlug) {
      title
      description
      price
      author
       promotedBy
      image {
        url
        public_id
      }
    productStatus
    }
  }
`;
export const PRODUCTS_BY_EMAIL= gql`
  query ProductsByEmail($email: String) {
    productsByEmail(email: $email) {
      title
      titleSlug
      description
      price
      promotedBy
      author
      createdAt
      image{
        url
        public_id
      }
      productStatus
      stock
      promo
      selection
      }
  }
`;
export const GET_PRODUCTS = gql`
  query Products {
    products {
      title
      titleSlug
      price
      author
       promotedBy
      image{
        url
        public_id
      }
      productStatus
      author
  	  promo
      stock
      selection
      rate
      createdAt
    }
  }
`;
export const PRODUCTS_BY_ID = gql`
  query ProductsById {
    productsById {
      title
      titleSlug
      price
      author
       promotedBy
      image{
        url
        public_id
      }
       productStatus
      author
  	  promo
      stock
      rate
      createdAt
    }
  }
`;
