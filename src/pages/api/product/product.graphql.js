export const productDefs = `
type Product {
  _id:ID!
  title: String
  titleSlug:String
  description:String
  price:Int
  offerPrice:Int
  author: String
  author_stripe_account_id:String
  image:ImageType
  productStatus: [String]
  promotedBy:[String]
  selection:String
  stock: Int
  promo: Int
  rate: Int
  quantity:Int
  reviews:[String]
  updatedAt: String
  createdAt: String
}
type ImageType {
  url:String
  public_id:String
}

input InputImageType {
  url:String
  public_id:String
}

input UpdateProductInput {
  title: String
  titleSlug:String!
  description:String
  price:Int
  image:InputImageType
   productStatus: [String]
  stock: Int
  promo: Int
  author:String
  selection:String
}

input ProductInput {
  title: String!
  description:String!
  price:Int!
  image:InputImageType
   productStatus: [String]
  stock: Int
  promo: Int
  author:String
  selection:String
}
input RemoveProductInput  {
  slug: String
  image_id: String
  selection:String
}

type RemoveProductOutput {
  success: Boolean
}
type Query {
    products: [Product!]
    productsById(id:String): [Product!]
    productsByEmail(email:String): [Product!]
    product(titleSlug: String):  Product
}

type Mutation {
    addProduct(input: ProductInput): Product!
    updateProduct(input:UpdateProductInput): Product!
    removeProducts(input: [RemoveProductInput]): RemoveProductOutput
}
enum ProductStatus {
    ORG
    FAM
    FRO
    LII
  }
`;
