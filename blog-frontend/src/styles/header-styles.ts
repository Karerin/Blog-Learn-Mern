import { Styles } from "./homepage-styles"

export const headerStyles:Styles = {
  appBar: {
    position: "sticky",
    background: "blueviolet",
  },
  tabContainer:{
    width: "100%",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  authBtn:{
    // paddingRight: "15px",
    // ml: 2,
    bgcolor: "#404040",
    color: "white",
    borderRadius: 20,
    width: 90,
    margin: "10px",
    ":hover": {
      bgcolor:"#6A0DAD"
  }
}
}