export type UserType = {
  name: string
  id: string
  email: string
  blogs: BlogType[]
  comments: CommentType[]
}

export type BlogType = {
  id: string
  title: string  
  content: string
  date: string
  user: UserType
  comments: CommentType[]
}

export type CommentType = {
  text: string
  date: string
  blog: BlogType
  user: UserType
}
