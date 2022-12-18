export const domainDefs = `
#scalar type
scalar DateTime
type Domain {
  _id: ID!
  title:String
  titleSlug:String
  viewers: [Viewer]
  image:String
  city:String
  country:String
  zip:String
  selections:[Selection]
  rewards: [String]
  messages:[MessageType]
  updatedAt: DateTime
  createdAt: DateTime
}

input CreateDomainInput {
  title:String
  image:String
  city:String
  country:String
  zip:String
  cards:[String]
  tablets:[String]
  selections:[String]
  rewards: String
 }


input UpdateDomainInput {
  titleSlug:String
  input:CreateDomainInput
}

input AddViewerInput {
  titleSlug:String
  login:String
}

input AddMessageInput {
  titleSlug:String
  input: String
}
type Query {
    domain(titleSlug: String): Domain!
    domains: [Domain!]
}
type Mutation {
    addDomain(input:CreateDomainInput):Domain
    updateDomain(input:UpdateDomainInput):Domain
    addViewerToDomain(input:AddViewerInput):Domain
    addMessage(input:AddMessageInput):Domain
    removeDomain(titleSlug: String):Boolean
  }
`;
