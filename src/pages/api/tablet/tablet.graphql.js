export const tabletDefs = `
#scalar type
scalar DateTime

type Tablet {
    _id: ID!
    title: String!
    titleSlug: String
    description: String
    tags: [String]
    souras:  [Int!]
    words: [String]
    coll:String
    cards: [Card]
    tabletstatus:TabletStatus
    level: Int
    liism:Int
    viewers:Int
    createdAt:DateTime
    updatedAt:DateTime
}
input TabletFilter {
    limit: Int
    page: Int
}


input BookingInput {
  limit:Int
  page:Int
}

type Query {
    tablets(args: TabletFilter): [Tablet!]
    tablet(titleSlug: String):Tablet!
  prepareSoura:[Soura]
}
input TabletInput {
    title: String!
    tags: [String]
    souras: [Int!]
    description: String
    words: [String]
    coll:String
    tabletstatus:TabletStatus
    level:Int
    liism:Int
}

input UpdateTabletInput {
    id: String,
    title: String!
    description: String
    tags: [String]
    souras: [Int!]
    words: [String]
    cards:[String]
    tabletstatus:TabletStatus   
    level:Int
    liism:Int
}
type Mutation {
    addTablet(input:TabletInput):Tablet
    updateTablet(input:UpdateTabletInput): Tablet
    validateTablet(titleSlug:String):Tablet
    removeTablet(titleSlug:String):Boolean
}
enum TabletStatus{
    SOBH
    DOHR
    ASR
    MAGH
    ICHA
  }
`;
