import { Schema, model, Document, Types } from "mongoose"
import { Request } from "express"

// interface IUser extends Document {
export interface IComment extends Document {
  text: string;
  date: string;
  blog: Types.ObjectId;
  user: Types.ObjectId;   
}

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // default: Date.now,
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

export default model("Comment", commentSchema)
