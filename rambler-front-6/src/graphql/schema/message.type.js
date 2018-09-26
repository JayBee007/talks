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

`;