import { gql } from '@apollo/client';

export const ADD_VIEWER = gql`
mutation AddViewer($input: AddViewerInput) {
    addViewer(input: $input) {
      _id
      login
      email
      phone
      address {
        name
        destination
        building
        street
        city
        state
        country
        contact
        zip
        isdefault
      }   
    }
  }  
`;
export const UPDATE_VIEWER = gql`
  mutation UpdateViewer($input: UpdateViewerInput) {
    updateViewer(input: $input) {
      _id
      login
      loginSlug
      hasWallet
      email
      bio
      phone
      website
      instagram
      organisation
      avatar{
        url
        public_id
      }
      flagAvatar
      role
     
    }
  }
`;
export const SET_FLAG_AVATAR = gql`
mutation SetFlagAvatar($input:SetFlagAvatarInput) {
    setFlagAvatar(input: $input) {
        flagAvatar
  }
  }
`;

export const UPDATE_VIEWER_ADDRESS = gql`
mutation UpdateViewerAddress($input: UpdateViewerAddressInput) {
    updateViewerAddress(input: $input) {
      _id
      login
      loginSlug
      email
      bio
    organisation
      role
      coords {
        lat
         long
      }
      addressGeo
      
    }
  }
`;


export const SEND_MESSAGE_VIEWER = gql`
  mutation SendMessageViewer($input:SendMessageViewerInput ) {
    sendMessageViewer(input: $input) {
    messages{
      sender
      
      rec
      content
      product
}    }
  }
`;

export const ADD_CONVERSATION_FEED = gql`
  mutation AddConversationFeed($input:AddConversationFeedInput ) {
    addConversationFeed(input: $input) {
    conversationFeed{
      sender
      product
      messages {
      rec
      content
      date
  }
  }
  }
  }
`;


export const DELETE_CONVERSATION_FEED = gql`
  mutation DeleteConversationFeed($input:DeleteConversationFeedInput ) {
    deleteConversationFeed(input: $input) {
    conversationFeed{
      sender
      product
      messages {
      rec
      content
      date
  }}}
  }
`;
export const REMOVE_VIEWER = gql`
  mutation RemoveViewer {
    removeViewer
  }
`;
export const REGISTER_EVENT = gql`
  mutation RegisterEvent($input:RegisterEventInput ) {
    registerEvent(input: $input) {
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
  }
  }
`;
export const CARD_BACK_REGISTER = gql`
  mutation CardBackRegister($input:CardBackInput) {
    cardBackRegiser(input:$input) {
      cardBack
    }
  }
`;

export const ADD_ENROLLMENT = gql`
    mutation AddEnrollment($input:EnrollmentInput ) {
    addEnrollment(input: $input) {
     success {
        title
        description
        price
        max
        enrollmentStatus
        startDate
        endDate
        
      }
    }
  }`
  
export const REMOVE_ENROLLMENT = gql`
    mutation RemoveEnrollment($input:RemoveEnrollmentInput ) {
    removeEnrollment(input: $input) {
     success {
        title
        description
        price
        max
        
      }
    }
  }`
  export const CONNECT_PAYOUT = gql`
    mutation ConnectPayout($input:ConnectPayoutInput ) {
    connectPayout(input: $input) {
     link
    }
  }`
export const CREATE_TEN_LIIS = gql`
    mutation CreateTenLiisResolver($id: String) {
    createTenLiisResolver(id: $id) {
     success {
        pass
        flag
      }
    }
  }`
  
export const CREATE_TEN_COLLABORATOR = gql`
    mutation CreateTenCollaboratorResolver($id: String) {
    createTenCollaboratorResolver(id: $id) {
     success {
        pass
        flag
      }
    }
  }`
  
  
 
  export const CREATE_HUNDRED_DISCOUNTS = gql`
    mutation CreateHundredDiscountsResolver($id: String) {
    createHundredDiscountsResolver(id: $id) {
       success {
        pass
        flag
      }
    }
  }`