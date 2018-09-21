export default `
  type Message {
    id: Int!
    text: String!
    user: User!
  }

  type Query {
    getMessages: [Message]!
  }

`;