import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql"
import Blog from "../models/Blog"
import Comment from "../models/Comment"
import User from "../models/User"

// Declare variables for later assignment
// let UserType: GraphQLObjectType;
// let BlogType: GraphQLObjectType;
// let CommentType: GraphQLObjectType;

// UserType = new GraphQLObjectType({
  export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    blogs: {
      type: GraphQLList(BlogType),
      async resolve(parent) {
        return await Blog.find({ user: parent.id })
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve(parent) {
        return await Comment.find({ user: parent.id })
      },
    },
  }),
})

// BlogType = new GraphQLObjectType({
  export const BlogType: GraphQLObjectType = new GraphQLObjectType({
  name: "BlogType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      async resolve(parent) {
        return await User.findById(parent.user)
      },
    },
    comment: {
      type: GraphQLList(CommentType),
      async resolve(parent) {
        return Comment.find({ blog: parent.id })
      },
    },
  }),
})

// CommentType = new GraphQLObjectType({
  export const CommentType: GraphQLObjectType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      async resolve(parent) {
        return await User.findById(parent.user)
      },
    },
    blog: {
      type: BlogType,
      async resolve(parent) {
        return await Blog.findById(parent.blog)
      },
    },
  }),
})


// export { UserType, BlogType, CommentType };