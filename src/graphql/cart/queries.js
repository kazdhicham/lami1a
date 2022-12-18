//import { gql } from "react-query";
import { gql } from '@apollo/client';

export const GET_CART = gql`
  query Selection($titleSlug: String) {
    selection(titleSlug: $titleSlug) {
      titleSlug
      title
      description
      author
      favorite
      image{
        public_id
        url
      }
      products {
        title
        titleSlug
        image{
          url
          }
        promote
        promo
        description
        price
        offerPrice
        rate
        status
        }
        }
  }
`;

export const GET_CARTS = gql`
  query Selections {
    selections {
      titleSlug
      title
      description
      author
      image{
        url
      public_id
      }
      products{
        title
        titleSlug
        image{url}
      }
      favorite
      }
  }
`;


export const GET_CART_BY_ID = gql`
query SelectionById($id:String) {
  selectionsById(id:$id) {
      title
      titleSlug
      description
      author
      favorite
      image{
        public_id
        url
      }
      products {
        title
        titleSlug
        image{url}
      }
}
}
`
