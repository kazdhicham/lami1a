export const profileDefs = `
#scalar type
scalar DateTime
type Profile {
  _id: ID!
  email: String!
  login: String
  phone: String
  isAdmin: Boolean
  address:Address
  role:[String]
  productsPromoted: [ProductPromoted]
  messages:[MessageType]
  conversationFeed:[ConversationFeedType]
  orders:[OrderType]
  enrollments:[EnrollmentType]
  affiliate:AffiliateType
  createdAt: DateTime
}

type MessageType {
    date:String  
    token: String!
    sender: String
    product:String
    rec:String
    content: String
 }
type EnrollmentType {
  title: String!
  viewer: String!
  price: Int
  dateStart:DateTime
  dateEnd:DateTime
}
type OrdersType {
  products: [ProductOrderType]!
  price: Int
  delivery:DeliveryType
  total:Int
  date:String
  }

type ProductPromoted {
  titleSlug:String 
  selectionSlug: String
}
type AffiliateType {
    token:String
    affiliator:String
}
type ProductOrderType {
  title:String
  price:Int
  quantity: Int
  promo: Int
}

type Address {
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault:Boolean
}
   
input AddressInput {
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault:Boolean
}
   
type AddProfileOutput {
    _id: ID!
    email: String!
}
  
input AddProfileInput {
    id: String!
    email: String!
    
  }
  input UpdateProfileInput {
    id: String!
    login: String!
    phone:String
    role:[String]
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault:Boolean
  }
  
input SendMessageInput {
    date:String  
    token: String!
    sender: String
    product:String
    rec:String
    content: String
  }
input PromoteInput {
  id: String!
  login: String!
  titleSlug: String!
  selectionSlug: String!
}
input StudsEnrollmentInput {
  email: String!
  login: String!
  id: String!
  title: String!
  viewer: String!
  description: String!
  price: Int
}
input AddAffiliationInput {
  email:String
  id:String
  token:String
  affiliator: String
  role:[String]
}

type Mutation {
    addProfile(input:AddProfileInput):AddProfileOutput
    updateProfile(input:UpdateProfileInput):Profile
    sendMessage(input:SendMessageInput):Profile
    removeProfile:Boolean
    promote(input: PromoteInput):Profile
    studsEnrollment(input:StudsEnrollmentInput): Profile
    addAffiliation(input:AddAffiliationInput): Profile
  }

type Query {
    profile(id:String): Profile
    profiles: [Profile!]
}
enum RoleType {
  USER
  COLL
  LIIS
 }
`;
