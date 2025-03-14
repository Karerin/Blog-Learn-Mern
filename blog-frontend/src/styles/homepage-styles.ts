import { SxProps } from "@mui/material"

export type Styles = {
  [key: string]: SxProps
}

export const homepageStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    gap: 4,
    alignItems: "center",
    padding: 6,
  },
  text: {
    fontFamily: "Work Sans",
    // fontWeight: "500",
    // textShadow: "12px 10px 8px #ccc",
    fontSize: { lg: 50, md: 40, sm: 35, xs: 20 },
  },
  image: {
    boxShadow: "10px 10px 25px #000",
    borderRadius: 20,
  },
  footerContainer: {
    bgcolor: "#404040",
    display: "flex",
    justifyContent: "space-between",//center
    alignItems: "center", 
    padding: "0 20px",//wala ni   
    height: "20vh",
    gap: 20,
  },
  footerBtn: {
    borderRadius: 10,
    bgcolor: "blueviolet",
    width: 200,
    margin: "10px",
    ":hover": {
      bgcolor:"#bd63fa"
    }
  },
  footerText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 20,
    color: "white"
  },
  

}
