// import React from 'react'
import { Card, Box,Typography } from "@mui/material"
import { BlogType } from "../../types/types"
import { blogStyles, randomBgColor } from "../../styles/blog-list-styles"
import { LuCalendarDays } from "react-icons/lu";

type Props = {
  blog: BlogType
}

const BlogItem = (props: Props) => {
  const CalendarIcon = LuCalendarDays as React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  return (
    <Card sx={blogStyles.card}>
      <Box sx={{...blogStyles.cardHeader, bgcolor: randomBgColor()}}>
      <Box sx={blogStyles.dateContainer}>
      <CalendarIcon size={24} style={{ }} />
        <Typography fontSize={"20px"} variant="caption">{new Date(Number(props.blog.date)).toDateString()}</Typography>
      </Box>
      <Typography variant="h4" sx={blogStyles.title}>
        {props.blog.title}
      </Typography>
      </Box>
      <Box sx={blogStyles.cardContent}>
        <Typography sx={blogStyles.contentText}>
          {props.blog.content}
        </Typography>
      </Box>
    </Card>
  )
}

export default BlogItem