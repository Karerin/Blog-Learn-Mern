import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"
import User from "../models/User"
import Blog from "../models/Blog"
import Comment from "../models/Comment"
import { UserType, BlogType, CommentType } from "../schema/schema"
import { Document } from "mongoose"
import { hashSync, compareSync } from "bcryptjs"

type DocumentType = Document<any, any, any> | null

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //get all users
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        return await User.find()
      },
    },
    //get all blogs
    blogs: {
      type: GraphQLList(BlogType),
      async resolve() {
        return await User.find()
      },
    },
    //get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        return await Comment.find()
      },
    },
  },
})

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user signup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: Document<any, any, any> | null
        try {
          existingUser = await User.findOne({ email })
          if (existingUser) return new Error("User already exists")
          const encryptedPassword = hashSync(password)
          const user = new User({ name, email, password: encryptedPassword })
          return await user.save()
        } catch (err) {
          return new Error("User Signup Failed. Try Again")
        }
      },
    },
    //user login
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: Document<any, any, any> | null
        try {
          existingUser = await User.findOne({ email })
          if (!existingUser)
            return new Error("No User Registered with this Email")
          const decryptedPassword = compareSync(
            password,
            // @ts-ignore
            existingUser?.password
          )
          if (!decryptedPassword) return new Error("Incorrect Password")
          return existingUser
        } catch (err) {
          return new Error("User Login Failed. Try Again")
        }
      },
    },
    //create blog
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { title, content, date }) {
        let blog: Document<any, any, any> | null
        try{
          blog = new Blog({ title, content, date })
          return await blog.save()
        } catch(err){
          return new Error("Blog Creation Failed. Try Again")
        }
      },
    },
    //update blog
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog: DocumentType
        try{
          existingBlog = await Blog.findById(id)
          if (!existingBlog) return new Error("Blog does not exist")
          return await Blog.findByIdAndUpdate(
          id, 
          {
            title,
            content,
        },
        { new: true })
        } catch (err){
          return new Error("Blog Update Failed. Try Again")
        }
      },
    },
    //delete blog
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id }) {
        let existingBlog: DocumentType
        try{
          existingBlog = await Blog.findById(id)
          if (!existingBlog) return new Error("no Blog Found")
          return await Blog.findByIdAndDelete(id)
        } catch (err){
          return new Error("Blog Deletion Failed. Try Again")
        }
      },
    }
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
})
