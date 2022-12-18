import { gql } from '@apollo/client';

export const ADD_TABLET = gql`
  mutation AddTablet($input: TabletInput) {
    addTablet(input: $input) {
      title
      titleSlug
      tags
      soura
      words
      image
      cards {
        id
        title
      }
      tabletstatus
      description
      level
    }
  }
`;

export const UPDATE_TABLET = gql`
  mutation UpdateTablet($input: UpdateTabletInput) {
    updateTablet(input: $input) {
      title
      titleSlug
      tags
      soura
      words
      image
      cards {
        id
        title
      }
      tabletstatus
      description
      level
    }
  }
`;

export const REMOVE_TABLET = gql`
  mutation RemoveTablet($titleSlug: String) {
    removeTablet(titleSlug: $titleSlug)
  }
`;

export const VALIDATE_TABLET = gql`
  mutation ValidateTablet($titleSlug: String) {
    validateTablet(titleSlug: $titleSlug) {
      title
    }
  }
`;
