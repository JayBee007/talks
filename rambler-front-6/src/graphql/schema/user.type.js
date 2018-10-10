export default `
# User type, describes the fields for it.
  type User {
    # Each user gets an id genereated by database.
    id: Int!
    # The user's username, should be typed in the login field.
    username: String!
  }
# Mutations for the User type
  type Mutation {
    # It logs a unique username in the chatroom and returns a boolean (true or false).
    login(username:String!): Boolean!
  }

  type Query {
    getUser(id: Int!): User
  }
`;