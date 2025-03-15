// import React from 'react'
import {Box, Typography} from '@mui/material'
import {homepageStyles} from '../../styles/homepage-styles'



const Homepage = () => {
  return (
  <Box sx={homepageStyles.container}>
    <Box sx={homepageStyles.wrapper}>
      <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions of People</Typography>
      <img 
      width="50%" 
      height="50%" 
      //@ts-ignore
      style={homepageStyles.image} 
      src="/Blog.png" 
      alt="Blog" />
    </Box>
    <Box sx={homepageStyles.wrapper}>
      <img 
      width="50%" 
      height="50%" 
      //@ts-ignore
      style={homepageStyles.image} 
      src="/Publish.png" 
      alt="Publish" />
      <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions of People</Typography>      
    </Box>
    <Box sx={homepageStyles.wrapper}>
      <Typography sx={homepageStyles.text}>Write and Share Your Blog With Millions of People</Typography>
      <img 
      width="50%" 
      height="50%" 
      //@ts-ignore
      style={homepageStyles.image} 
      src="/Articles.png" 
      alt="Articles" />
    </Box>    
  </Box>
  )
}

export default Homepage