require("dotenv").config();
const { ApolloServer} = require("apollo-server");
const dbClient = require("./app/model/dbClient");

const knexConfig = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  //debug:true
};

const schema = require("./app/gql/schema");
const resolvers = require("./app/gql/resolvers");

const userDS = require("./app/gql/datasource/userDS")
const showDS = require("./app/gql/datasource/showDS")
const referenceDS = require("./app/gql/datasource/referenceDS")
const characterDS = require("./app/gql/datasource/characterDS")
const bookmarksDS = require("./app/gql/datasource/bookmarksDS")
const artistDS = require("./app/gql/datasource/artistDS")

const user = new userDS (knexConfig);
const show = new showDS (knexConfig);
const reference  = new referenceDS (knexConfig);
const character  = new characterDS (knexConfig);
const bookmarks  = new bookmarksDS (knexConfig);
const artist  = new artistDS (knexConfig);

const server = new ApolloServer({
  schema,
  resolvers,
  introspection:true,
  dataSources:()=>([user, show, reference, character, bookmarks, artist])
});


const PORT = process.env.PORT || 3000;
server.listen(PORT).then(({ url }) => {
  console.log(`Listening on ${url}`);
});