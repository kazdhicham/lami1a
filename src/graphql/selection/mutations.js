import { gql } from '@apollo/client';

export const ADD_SELECTION = gql`
mutation AddSelection($input: SelectionInput) {
    addSelection(input: $input) {
      title
      description
      image{
        url
      }
      author
      status
       createdAt


    }
  }
`;
export const UPDATE_SELECTION = gql`
  mutation UpdateSelection($titleSlug: String, $input: SelectionInput) {
    updateSelection(titleSlug: $titleSlug, input: $input) {
      title
      description
      image{
        url
      }
      author
      status
      products {
       titleSlug
       createdAt
       title
        image{
        url
      }
        description
      }
    }
  }
`;

export const REMOVE_SELECTIONS = gql`
  mutation RemoveSelections($input: [RemoveSelectionsInput]) {
    removeSelections(input: $input) {
      removeSuccess
    }
  }
`;

export const PROMOTE_SELECTION = gql`
mutation PromoteSelection($input: SelectionPromoteInput ) {
  promoteSelection(input:$input) {
    title
      description
      image{
        url
      }
      author
      status
      products {
      
       titleSlug
        title
        image{
        url
      }
        description
      }
    promote
}
}
`;
