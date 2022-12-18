export const cardDefs = `
type Card {
    _id: ID!
    title: String!
    titleSlug:  String
    description: String
    tags: [String]
    soura:  Int!
    words: [String]
    viewers:[Viewer]
    cardStatus: CardStatus
    rate:  Int
}
input CardFilter {
   limit: Int
    page: Int
}

type Query {
    cards(input:CardFilter): [Card]
    card(titleSlug: String):Card!
}

input CardInput {
    title: String!
    tags: [String]
    soura:  Int!
    words: [String]
}
input UpdateCardInput {
    titleSlug:String,
    input:CardInput
}

type Mutation {
    addCard(input: CardInput):Card
    updateCard(input: UpdateCardInput): Card
    validateCard(titleSlug: String):Card
    removeCard(titleSlug: String):Boolean
}

enum CardStatus{
    SOBH
    DOHR
    ASR
    MAGH
    ICHA
  }
`;
