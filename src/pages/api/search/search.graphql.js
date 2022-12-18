export const searchDefs = `
type ResultType {
  name: String
  description:String
  object:Product
}
type Query {
    result: [ResultType!]
     }
`;
