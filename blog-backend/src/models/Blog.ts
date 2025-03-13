import { Schema, model, Document, Types } from "mongoose"
import { Request } from "express"

// interface IUser extends Document {
export interface IBlog extends Document {
  title: string;
  email: string;
  password: string;
  user: Types.ObjectId; // Define the correct type for blogs
  comments: Types.ObjectId[];
}
const blogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Comment" 
  }],
})

export default model("Blog", blogSchema)
