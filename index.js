const express = require("express")

const { graphqlHTTP } = require("express-graphql")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
} = require("graphql")

const app = express()

const userList = [
  { id: 1, name: "John", email: "john@test.com" },
  { id: 2, name: "James", email: "james@test.com" },
  { id: 3, name: "Michael", email: "michael@test.com" },
]
//Type
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
})
//Main Query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //to get all users
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return userList
      },
    },
  },
})
//Schema
const schema = new GraphQLSchema({
  query: RootQuery,
})
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(5000, () => console.log("Server is running on port 5000"))
