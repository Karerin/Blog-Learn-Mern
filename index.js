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

let userList = [
  { id: "1", name: "John", email: "john@test.com" },
  { id: "2", name: "James", email: "james@test.com" },
  { id: "3", name: "Michael", email: "michael@test.com" },
]
//Type/Schema
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
})
//Main Query/Resolver
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //to get all users
    users: {
      type: new GraphQLList(UserType),
      // resolve(parent, args) {
        resolve() {
        return userList
      },
    },
    //to get user by id
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userList.find((user) => user.id === args.id)
      },
    },
  },
})

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //adding user
    addUser:{
      type:UserType,
      args:{
        name:{type:GraphQLString},
        email:{type:GraphQLString}
      },
      resolve(parent, {name,email}){
        const newUser = {name, email, id: Date.now().toString()}
        userList.push(newUser)
        return newUser
      }
    },
    //updating user
    updateUser:{
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, { id, name, email }) {
        const user = userList.find((user) => user.id === id)
        if (!user) {
          return null
        }
        user.name = name
        user.email = email
        return user
      }
    },
    //deleting user
    deleteUser:{
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        const user = userList.find((u)=>u.id === id)
        userList = userList.filter((u)=>u.id !== id)
        return user
      }
    },
  }
})

//Schema
const schema = new GraphQLSchema({
  query: RootQuery, mutation: mutations
})
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(5000, () => console.log("Server is running on port 5000"))
