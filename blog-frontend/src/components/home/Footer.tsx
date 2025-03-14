// import React from 'react'
import {Box, Typography, Button} from '@mui/material'
import {homepageStyles} from '../../styles/homepage-styles'

function Footer() {
  return (
    <Box sx={homepageStyles.footerContainer}>
      <Typography sx={homepageStyles.footerText}>Made With &#x2764;</Typography>
      <Box>
      <Button variant="contained" sx={homepageStyles.footerBtn}>View Articles</Button>      
      <Button variant="contained" sx={homepageStyles.footerBtn}>Publish One</Button>
      </Box>      
    </Box>
  )
}

export default Footer