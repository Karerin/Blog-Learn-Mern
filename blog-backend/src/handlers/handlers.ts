import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"
import User from "../models/User"
import { IUser } from "../models/User"
import Blog from "../models/Blog"
import { IBlog } from "../models/Blog"
import Comment from "../models/Comment"
import { UserType, BlogType, CommentType } from "../schema/schema"
import { Document, startSession } from "mongoose"
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
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { title, content, date, user }) {
        let blog: Document<any, any, any> | null
        const session = await startSession()
        try {
          blog = new Blog({ title, content, date, user })
          const existingUser = (await User.findById(
            user
          ).exec()) as IUser | null
          if (!existingUser) return new Error("User Not Found! Exiting")
          session.startTransaction()
          existingUser.blogs.push(blog._id)
          await existingUser.save({ session })
          return await blog.save({ session })
        } catch (err) {
          return new Error("Blog Creation Failed. Try Again")
        } finally {
          await session.commitTransaction()
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
        try {
          existingBlog = await Blog.findById(id)
          if (!existingBlog) return new Error("Blog does not exist")
          return await Blog.findByIdAndUpdate(
            id,
            {
              title,
              content,
            },
            { new: true }
          )
        } catch (err) {
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
        const session = await startSession()
        try {
          session.startTransaction({ session })
          existingBlog = await Blog.findById(id).populate("user")
          //@ts-ignore
          const existingUser = existingBlog?.user
          if (!existingUser) return new Error("No user linked to this blog")
          if (!existingBlog) return new Error("no Blog Found")
          existingUser.blogs.pull(existingBlog._id)
          await existingBlog.save({ session })
          // return await existingBlog.remove({ session })
          return await Blog.findByIdAndDelete(id)
        } catch (err) {
          return new Error("Blog Deletion Failed. Try Again")
        } finally {
          // session.abortTransaction
          session.commitTransaction()
        }
      },
    },
    //add comment to blog
    addCommentToBlog: {
      type: CommentType,
      args: {
        blog: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { user, blog, text, date }) {
        const session = await startSession()
        let comment: DocumentType
        try {
          session.startTransaction({ session })
          const existingUser = (await User.findById(
            user
          ).exec()) as IUser | null
          const existingBlog = (await Blog.findById(
            blog
          ).exec()) as IBlog | null
          if (!existingUser || !existingBlog)
            return new Error("User or Blog not found")
          comment = new Comment({ user, blog, text, date })
          existingUser.comments.push(comment._id)
          existingBlog.comments.push(comment._id)
          await existingUser.save({ session })
          await existingBlog.save({ session })
          return await comment.save({ session })
        } catch (err) {
          return new Error("Comment Creation Failed. Try Again")
        } finally {
          await session.commitTransaction()
        }
      },
    },
    //delete comment from blog
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let comment: DocumentType
        const session = await startSession()
        try {
          session.startTransaction()
          comment = await Comment.findById(id).exec()
          if (!comment) return new Error("Comment not found")
          //@ts-ignore
          const existingUser = (await User.findById(comment?.user).exec()) as IUser | null
          if (!existingUser) return new Error("User Not Found")
          //@ts-ignore
          const existingBlog = (await Blog.findById(comment?.blog).exec()) as IBlog | null
          if (!existingBlog) return new Error("Blog Not Found")
          // existingUser.comments.pull(comment._id)
          // existingBlog.comments.pull(comment._id)
          // await existingUser.save({ session })
          // await existingBlog.save({ session })
          // // return await comment.remove({ session })
          // return await Comment.findByIdAndDelete(id)

          // Remove the comment reference from the user and blog
          await User.updateOne(
            { _id: existingUser._id },
            { $pull: { comments: comment._id } }
          ).session(session)
          await Blog.updateOne(
            { _id: existingBlog._id },
            { $pull: { comments: comment._id } }
          ).session(session)

          // Delete the comment
          // return await comment.deleteOne({id: comment.id}) //the updated code on the yt tutorial
          return await Comment.findByIdAndDelete(id)
        } catch (err) {
          return new Error("Comment Deletion Failed. Try Again")
        } finally {
          await session.commitTransaction()
        }
      },
    },
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
})
