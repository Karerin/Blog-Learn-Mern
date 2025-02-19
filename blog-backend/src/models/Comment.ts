import { text } from "body-parser"
import {model, Schema} from "mongoose"

const commentSchema = new Schema({
text: {
    type: String,
    required: true,
},
date: {
    type: Date,
    // default: Date.now,
    required: true,
}
})

export default model("Comment", commentSchema)