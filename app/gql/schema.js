const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type Show {
        id: ID!
        title: String!
        category: String!
        picture: String!

        reference: [Reference]
        artist: [Artist]
        character: [Character]
    }

    type Reference {
        id: ID!
        ref: String!
        mature: Boolean!
        status: Boolean!

        user: [User]
        show: [Show]
    }

    type User {
        id: ID!
        username: String!
        email: String!
        birthday: Int!
        profile_picture: String!

        role: [Role]
        grade: [Grade]
        bookmarks: [Bookmarks]
    }

    type Role {
        id: ID!
        name: String!
    }

    type Grade {
        id: ID!
        name: String!
    }

    type Bookmarks {
        id: ID!
        title: String!

        reference: [Reference]
    }

    type Artist {
        id: ID!
        name: String!

        show: [Show]
    }

    type Character {
        id: ID!
        name: String!

        show: [Show]
    }

    type Tag {
        id: ID!
        name: String!

        reference: [Reference]
    }

    type Mutation {

        createUser(
            username: String!
            email: String!
            birthday: Int!
            password: String!
        ):User

        createShow (
            title: String!
            category: String!
        ):Show

        createArtist (
            name: String!
        ):Artist

        createCharacter (
            name: String!
        ):Character

        createTag (
            name: String!
        ):Tag
    }
    

    type Query {
        hello: String
    }


`);

module.exports = schema;