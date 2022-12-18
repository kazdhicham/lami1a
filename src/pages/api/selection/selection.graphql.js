export const selectionDefs = `
type Selection {
  _id:ID!
  title: String!
  titleSlug:String
  description:String!
  image:ImageType
  author: String
  products:[Product]
  status:[String]
  promote:[String]
  updatedAt: String
  createdAt: String
}


type ImageType {
  url:String
  public_id:String
}
type RemoveOutputType {
  removeSuccess: Boolean
}
input InputImageType {
  url:String
  public_id:String
}
input SelectionInput {
  title: String!
  description:String!
  image:InputImageType
  author:String
  selectionStatus: [String]
  }
input RemoveSelectionsInput {
  slug:String
  image_id:String
}
input UpdateSelectionInput {
  titleSlug:String
  input:SelectionInput
}

type Query {
    selections: [Selection!]
    selection(titleSlug: String):  Selection
    favorites(id: String):[Selection!]
    getproducts(titleSlug: String):[Product]
    selectionsByAuthor(email:String): [Selection!]
}
type Mutation {
  addSelection(input: SelectionInput): Selection!
  updateSelection(input:UpdateSelectionInput): Selection!
  removeSelections(input:[RemoveSelectionsInput]): RemoveOutputType
}
  
enum SelectionStatus {
    ORG
     FAM
     FRO
     LII
  }
`;
