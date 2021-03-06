import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date

  type Listing {
    id: ID!
    title: String!
    description: String!
  }

  type User {
    id: ID!
    email: String!
  }

  type UserSession {
    id: ID!
    user: User!
    createdAt: Date!
    expiresAt: Date!
  }

  type Mutation {
    createListing(title: String!, description: String!): Listing!
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(sessionId: ID!): Boolean!
  }

  type Query {
    listings: [Listing!]!
    userSession(me: Boolean!): UserSession
  }
`;

export default typeDefs;
