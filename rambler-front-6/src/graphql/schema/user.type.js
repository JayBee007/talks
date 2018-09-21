export default `
  type User {
    id: Int!
    username: String!
  }

  type Mutation {
    login(username:String!): Boolean!
  }
`;