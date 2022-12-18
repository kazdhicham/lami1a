import { gql } from '@apollo/client';

export const VIEWERS = gql`
  query Viewers {
    viewers {
      login
      email
      isAdmin
    avatar {
        url
        public_id
      }
        flagAvatar
      instagram
      website
      organisation 
      bio
      phone
      cha3bi
      role
     
  enrollmentAll {
    title
    description
    price
  }
}
  }
`;

export const VIEWER = gql`
    query Viewer($email: String) {
    viewer(email: $email) {
      _id
       login
       loginSlug
      hasWallet
      email
      isAdmin
      phone
      productsPromoted
      instagram
      website
      messages{
        sender
        content
        product
        date
        rec
        
      }
         events{
         id
    title
    content
    allDay
    start
    end
    status
    contact
        }
      coords {
        lat
        long
      }
      addressGeo
      organisation 
      bio
      avatar {
        url
        public_id
      }
      flagAvatar
      orders{
        quantity 
        profileId
        products{title}
        total
      }
      role
    cha3bi
  walletId
  hasWallet
  liispass{
          pass
          flag
        }
   collaboratorpass{
    pass
    flag
    }
  hundreddiscountspass{
  pass
  flag
}
discountProfiles {
      token
      profileEmail
      profileId
      flag
      }
      liismanagerProfiles {
      token
      profileEmail
      profileId
      flag
      }
      collaboratorProfiles {
      token
      profileEmail
      profileId
      flag
      }
  enrollmentAll {
    title
    description
    price
    max
    startDate
    endDate
    enrollmentStatus
    image{
      url
      public_id
    }
  }
  updatedAt
  createdAt
    }
  }
`;
export const VIEWER_BY_ID = gql`
 query ViewerById($id: String) {
    viewerById(id: $id) {
      login
      email
      phone
      productsPromoted
      instagram
      isAdmin
      website
       avatar {
        url
        public_id
      }
      coords {
        lat
        long
      }
      addressGeo
      organisation 
      bio
      orders{
        quantity 
        profileId
        products{title}
        total
      }
     role
    cha3bi
    walletId
    hasWallet
    liispass{
    pass
    flag
  }
   collaboratorpass{
        flag
          pass
     }
  hundreddiscountspass{
  pass
  flag
}
  enrollmentAll {
    title
    description
    price
    image {
      url
    }
    max
    enrollmentStatus
    startDate
    endDate
  }
 updatedAt
  createdAt
    }
  }
`;


export const FRONT_COLLABORATORS = gql`
    query FrontCollaborators {
    frontcollaborators {
      login
      email
      phone
      productsPromoted
      isAdmin
    coords {
        lat
        long
      }
     addressGeo
     avatar {
        url
        public_id
      }
      orders{
        quantity 
        profile
        products
        total
      }
      role
    cha3bi
  walletId
   collaboratorpass{
        pass
      }
   discountpass{
        pass}
hundreddiscountspass{
  pass
}
  enrollmentAll {
    title
    description
    price
  }
  updatedAt
  createdAt
    }
  }
`;


export const GET_DISCOUNT_PRODUCTS = gql`
    query GetDiscountProducts($input:GetDiscountInput ) {
    getDiscountProducts(input:$input) {
     discountProducts{
      title
      stock
      } 
      updatedAt
  createdAt
    }
  }
`;

export const ENROLLMENTS_BY_EMAIL = gql`
    query EnrollmentByEmail($email:String ) {
    enrollmentByEmail(email:$email) {
      title
      description
      price
      image {
        url
        public_id
      }
      max 
    }
  }
`;

export const GET_QRCODE = gql`
    query GetQrCode($url:String) {
      getQrCode(url:$url) {
          qrCodeUrl
    }
  }`