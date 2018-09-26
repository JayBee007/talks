export default `
# Type for sending messages in the chatroom
  type Message {
    id: Int!
    text: String!
    user: User!
  }

  type Query {
    # Returns all messages as an array of objects or empty array if not messages are present.
    getMessages: [Message]!
  }

  type Mutation {
    # Send message, takes username as an argument
    sendMessage(username: String!, text: String!): Boolean!
  }

  type Subscription {
    messageAdded: Message!
  }

`;