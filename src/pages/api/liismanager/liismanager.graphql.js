export const liismanagerDefs = `
#scalar type
scalar DateTime
type Liismanager {
  _id: ID!
  login: String
  cardBack:Int
  loginSlug: String
  email: String
  password: String
  stripe_account_id:String
  hasWallet:Boolean
  cha3bi:Int
  walletId:String
  phone:String
  bio: String
  organisation: String
  avatar:AvatarType
  role: [String]
  website: String
  instagram: String
  liisCategories:[LiisCategoriType]
  orders:[OrderType]
  messages:[MessageType]
  isAdmin: Boolean
  token:String
  productsPromoted:[String]
  bookings:[BookingType]
  discountProducts:[DiscountProductType]
  sales:Int
  studspass:[StudType]
  studsProfiles:[ConnexionProfileType]
  enrollmentAll:[EnrollmentType]
  coords:CoordsType
  addressGeo:String
  continent:String
  rewards: [String]
  updatedAt: DateTime
  createdAt: DateTime
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
type MessageType {
  id:String
  rec:String
  product:String
  sender: String
  content: String
  date:String
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

input AddLiismanagerInput {
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

type LiismanagerOutput {
  _id:String
  login:String
  email:String
  phone:String
role:[String]
 address:Address
 isAdmin:Boolean
 
}   
input UpdateLiismanagerInput {
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
input UpdateLiismanagerAddressInput {
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
input SendMessageInput {
    id: String
    sender: String
    product:String
    rec:String
    content: String
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
input GetDiscountInput {
  affiliate: String
  discountToken: String
}
input CardBackInput {
  id:String
  card:Int
}
type Mutation {
    addLiismanager(input:AddLiismanagerInput):LiismanagerOutput
    updateLiismanager(input:UpdateLiismanagerInput):Liismanager
    setFlag(input:SetFlagAvatarInput):Liismanager
    sendMessageLiismanager(input:SendMessageInput):Liismanager
    updateLiismanagerAddress(input:UpdateLiismanagerAddressInput):Liismanager
    removeLiismanager(email:String):Boolean
    removeToken(token: String): Boolean 
    connectPayout(input:ConnectPayoutInput ): ConnectPayoutOutput   
    createHundredStudsResolver(id: String): CreateTenLiisOutput
    addEnrollment(input:EnrollmentInput): EnrollmentOutput
    updateEnrollment(input:UpdateEnrollmentInput): EnrollmentOutput
    removeEnrollment(input:RemoveEnrollmentInput): EnrollmentOutput
    createFlagsResolver(id:String): CreateTenLiisOutput, 
  
  }
 
  
  type Query {
    liismanager(email:String): Liismanager
    liismanagerById(id:String): Liismanager
    liismanagers: [Liismanager!]
   enrollmentByEmail(email:String): [EnrollmentOutput]
    getDiscountProducts(input:GetDiscountInput) :[Product]
    getQrCode(url:String): qrCodeOutput
   }
 
`;
