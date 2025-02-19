import {connect} from 'mongoose'

export const connectToDatabase = async () => {
  try{
    await connect(`mongodb+srv://Admin:${process.env.MONGODB_PASSWORD}@library.klbm8.mongodb.net/?retryWrites=true&w=majority&appName=library`)
  }catch(err){
    console.log(err)
    return err
  }
}