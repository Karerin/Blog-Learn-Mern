import { GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql"
import  User  from "../models/User"
import Blog from "../models/Blog"
import Comment from "../models/Comment"
import { UserType, BlogType, CommentType } from "../schema/schema"


const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //get all users
    users:{
      type: GraphQLList(UserType),
      async resolve(){
        return await User.find()
      }
    },
    //get all blogs
    blogs:{
      type: GraphQLList(BlogType),
      async resolve(){
        return await User.find()
      }
    },
    //get all comments
    comments:{
      type: GraphQLList(CommentType),
      async resolve(){
        return await Comment.find()
      }
    },
  }
})

export default new GraphQLSchema({
  query: RootQuery
})