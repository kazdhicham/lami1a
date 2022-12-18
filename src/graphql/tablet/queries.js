export const GET_TABLET = `
  mutation GetTablet($slug: ID) {
    getTablet(slug: $slug) {
      title
      description
      price
      author
      category
      selection
      image
      status
    }
  }
`;

export const GET_TABLETS = `
  query Tablets {
    tablets {
      title
      description
      price
      author
      category
      selection
      image
      status
    }
  }
`;
export const GET_STATS = `
  mutation GetTablet($slug: ID) {
    getTablet(slug: $slug) {
      title
      description
      price
    
    }
  }
`;
