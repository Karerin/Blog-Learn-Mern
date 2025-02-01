const express = require("express")

const { graphqlHTTP } = require("express-graphql")
const { GraphQLObjectType } = require("graphql")

const app = express()

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: {},
    graphiql: true,
  })
)

app.listen(5000, () => console.log("Server is running on port 5000"))
