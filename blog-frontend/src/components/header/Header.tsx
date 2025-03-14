import React from 'react'
import { AppBar, Toolbar,Box,Tabs, Tab, Button } from "@mui/material"
import { ImBlogger } from "react-icons/im"
import { IoMdLogIn } from "react-icons/io";
import { headerStyles } from '../../styles/header-styles'

// import {headerStyles} from '../../styles/header-styles'


const Header = () => {  
  const BloggerIcon = ImBlogger as React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  const AuthIcon = IoMdLogIn as React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  const [value, setValue] = React.useState(0)
  return (
     <AppBar sx={headerStyles.appBar}>
      <Toolbar>
      <BloggerIcon size={24} style={{ borderRadius: "50%", padding: "10px", background: "#404040" }} />
      
     <Box sx={headerStyles.tabContainer}>
      <Tabs textColor="inherit" sx={{"& .MuiTabs-indicator": {backgroundColor: "white",},
                                    }} value={value} onChange={(e, newValue) => setValue(newValue)}>
        <Tab disableRipple label="Home"/>
        <Tab label="Blogs"/>
      </Tabs>
      <Button sx={headerStyles.authBtn} endIcon={<AuthIcon size={24} style={{ background: "transparent" }} />}>AUTH
      </Button>
     </Box>
      </Toolbar>
     </AppBar>
  )
}

export default Header