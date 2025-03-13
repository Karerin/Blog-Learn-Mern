import { Schema, model, Document, Types } from "mongoose"
import { Request } from "express"

// interface IUser extends Document {
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  blogs: Types.ObjectId[]; // Define the correct type for blogs
  comments: Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  blogs: [{ 
    type: Schema.Types.ObjectId,
    ref: "Blog" 
  }],
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Comment" 
  }],
})

export default model("User", userSchema)

