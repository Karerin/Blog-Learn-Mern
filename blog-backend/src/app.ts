import express from "express"
import {config} from "dotenv"
import {connectToDatabase} from "./utils/connection"
import {graphqlHTTP} from "express-graphql"
import schema from "./handlers/handlers"
import cors from "cors"
//dotenv config
config()

const app = express()
app.use(cors())

app.use("/graphql", graphqlHTTP({
  schema: schema, graphiql: true
}))

//this connectToDatabase is from connection.ts
//this is a promise so we can use .then and .catch
connectToDatabase()
.then(() =>{
  app.listen(process.env.PORT, () =>
    console.log(`Server Open On Port ${process.env.PORT}`)
  )
})
.catch((err) => console.log(err))

// console.log('Ohayou Sekai Good Morning World!');