import express from "express"
import {config} from "dotenv"
import {connectToDatabase} from "./utils/connection"

//dotenv config
config()

const app = express()



//this connectToDatabase is from connection.ts
//this is a promise so we can use .then and .catch
connectToDatabase()
.then(() =>{
  const app = express()
  app.listen(process.env.PORT, () =>
    console.log(`Server Open On Port ${process.env.PORT}`)
  )
})
.catch((err) => console.log(err))

// console.log('Ohayou Sekai Good Morning World!');