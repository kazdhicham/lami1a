export const viewerDefs = `
#scalar type
scalar DateTime
type Viewer {
  _id: ID!
  login: String
  cardBack:Int
  loginSlug: String
  email: String
  password: String
  stripe_account_id:String
  hasWallet:Boolean
  phone:String
  bio: String
  avatar:AvatarType
  flagAvatar: String
  organisation: String
  role: [String]
  website: String
  instagram: String
  liisCategories:[LiisCategoriType]
  orders:[OrderType]
  messages:[MessageType]
  events:[EventType]
  conversationFeed:[ConversationFeedType]
  isAdmin: Boolean
  cha3bi:Int
  walletId:String
  token:String
  productsPromoted:[String]
  bookings:[BookingType]
  selections:[String]
  products:[Product]
  discountProducts:[DiscountProductType]
  sales:Int
  liispass:[StudType]
  collaboratorpass:[StudType]
  discountpass:[StudType]
  hundreddiscountspass:[StudType]
  discountProfiles:[ConnexionProfileType]
  liismanagerProfiles:[ConnexionProfileType]
  collaboratorProfiles:[ConnexionProfileType]
  enrollmentAll:[EnrollmentType]
  coords:CoordsType
  addressGeo:String
  continent:String
  rewards: [String]
  updatedAt: DateTime
  createdAt: DateTime
}
 
type ConversationFeedType {
  product:String
  sender: String
  rep: String
  messages: [ConversationMessage]
}
type ConversationMessage {
      date:String  
      rec:String
      content: String
    }
type EventType {
  id: String
    title: String
    content: String
    allDay: Boolean
    start: String
    end: String
    status: String
    contact: String
}
type LiisCategoriType {
  title: String!
  description: String!
  price: Int
}

type DiscountProductType {
    title:String
    stock:Int
    price:Int
  }
type AvatarType {
  public_id: String!
  url: String!
}

type StudType {
  flag: String
  pass:String
  }
type ConnexionProfileType {
    token: String
   profileEmail: String
    profileId: String
     flag: String
   }

type CoordsType {
  lat:Float
  long:Float
}
input CoordsTypeInput {
  lat:Float
  long:Float
}
type OrderType {
      products: [ProductOrderType]
      quantity: Int
      profileId: String
      total:Int
}
type ProductOrderType {
        title:String
        price:Int
        promo:Int
        quantity:Int
}

type BookingType  {
  bookingStartDate: String
  bookingEndDate: String
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

input AddViewerInput {
  login:String
  email:String
  phone:String
  role:[String]
  uid:String
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    zip:String
    contact: String
    isdefault:Boolean
}

type ViewerOutput {
  _id:String
  login:String
  email:String
  phone:String
role:[String]
 address:Address
 isAdmin:Boolean
 
}   
input UpdateViewerInput {
  email:String  
  login:String
  bio:String
  instagram:String
  website:String
  phone:String
  role:[String]
  organisation: String
  avatar:AvatarTypeInput

}
input AvatarTypeInput {
  public_id: String!
  url: String!
}
input UpdateViewerAddressInput {
    email:String
    coords:CoordsTypeInput
    addressGeo:String
 }
input ConnectPayoutInput {
    email: String
    id: String
}
type ConnectPayoutOutput {
    link: String
}
input SendMessageViewerInput {
    date:String  
    sender: String
    token: String
    product:String
    rec:String
    content: String
  }
 
  input AddConversationFeedInput {
    email:String
    sender: String
    product:String
    rec:String
    content: String
    date:String  
  }
  input DeleteConversationFeedInput {
    sender: String
    email: String
    product:String
    rec: String
    }

 type LiisPassType {
  pass:String
  flag: String
 } 
type CreateTenLiisOutput {
  success: [LiisPassType]
}
type EnrollmentType {
  title:String
  description:String
  price:Int
  image : AvatarType
  max : Int
  enrollmentStatus:[String]
  startDate:String
  endDate:String
 } 
type EnrollmentOutput {
  success: [EnrollmentType]
}
type qrCodeOutput {
  qrCodeUrl: String
}
input SetFlagAvatarInput {
  id: String
  name: String
}
input PassFlagInput {
  id: String
  email: String
}
input EnrollmentInput {
  id: String
  title: String
  description:String
  price:Int
  image:AvatarTypeInput
  enrollmentStatus: [String]
  max: Int
  startDate:String
  endDate:String
}
input UpdateEnrollmentInput {
  id: String
  title: String
  description:String
  price:Int
  image:AvatarTypeInput
  enrollmentStatus: [String]
  max: Int
  startDate:String
  endDate:String
}

input RemoveEnrollmentInput {
  id: String
  title: [String]
}
input EventTypeInput {
   id: String
    title: String
    content: String
    allDay: Boolean
    start: String
    end: String
    status: String
    contact: String
}
input RegisterEventInput {
   email: String
  events: [EventTypeInput]
  }

input GetDiscountInput {
  affiliator: String
  discountToken: String
}
input CardBackInput {
  id:String
  card:Int
}
type Mutation {
    addViewer(input:AddViewerInput):ViewerOutput
    updateViewer(input:UpdateViewerInput):Viewer
    setFlagAvatar(input:SetFlagAvatarInput):Viewer
    sendMessageViewer(input:SendMessageViewerInput):Viewer
    addConversationFeed(input:AddConversationFeedInput):Viewer
    deleteConversationFeed(input:DeleteConversationFeedInput):Viewer
    updateViewerAddress(input:UpdateViewerAddressInput):Viewer
    removeViewer(email:String):Boolean
    removeToken(token: String): Boolean 
    connectPayout(input:ConnectPayoutInput ): ConnectPayoutOutput   
    createTenLiisResolver(id: String): CreateTenLiisOutput
    createTenCollaboratorResolver(id: String): CreateTenLiisOutput
    createHundredDiscountsResolver(id: String): CreateTenLiisOutput
    addEnrollment(input:EnrollmentInput): EnrollmentOutput
    updateEnrollment(input:UpdateEnrollmentInput): EnrollmentOutput
    removeEnrollment(input:RemoveEnrollmentInput): EnrollmentOutput
    createFlagsResolver(id:String): CreateTenLiisOutput, 
    cardBackRegiser(input:CardBackInput): Viewer
    registerEvent(input:RegisterEventInput): Viewer
  }
 
  
  type Query {
    viewer(email:String): Viewer
    viewerById(id:String): Viewer
    viewers: [Viewer!]
    frontcollaborators: [Viewer!]
    enrollmentByEmail(email:String): [EnrollmentOutput]
    getDiscountProducts(input:GetDiscountInput) :[Product]
    getQrCode(url:String): qrCodeOutput
   }
 
`;
