import { Box } from "@mui/material"
import { BlogType } from "../../types/types"
import BlogItem from "./BlogItem"
import { blogStyles } from "../../styles/blog-list-styles"

// import React from 'react'
type Props = {
  blogs: BlogType[]
}

const BlogList = (props: Props) => {
  return (
    <Box sx={blogStyles.container}>
      {props.blogs.length > 0 && props.blogs.map((blog: BlogType) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </Box>
  )
}

export default BlogList