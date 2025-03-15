import { Styles } from "./homepage-styles"

const colors = [
  "#6A0DAD",
  "#FFD700",
  // "#FF4500",
  "#20B2AA",
  "#FF69B4",
  "#B0E0E6",
  "#8FBC8F",
  "#DDA0DD",
  "#A52A2A",
  "#708090",
]

export function randomBgColor(){
  return colors[Math.floor(Math.random() * colors.length)]
}

export const blogStyles: Styles = {
  container: {
    backgroundColor: "#EAE2F8 ",
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10,
    flexWrap: 'wrap', 
  },
  card:{
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    transition: 'transform 1s',
    ":hover": {
      transform: 'scale(1.02)',
      boxShadow: '10px 10px 20px #D1C4E9',
    },
    m:5
  },
  cardHeader: {
    fontFamily:'Work Sans',
    fontSize: '72px',
    height: '35%',
    padding: 1,
  },
  dateContainer:{
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  cardContent: {
    width: '100%',
    height: '100%',
    fontSize: '20px',
    fontWeight: '500',
  },
  title:{
    fontWeight: "600",
    m:1,
    color: 'white',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    fontFamily: 'Work Sans',
    // textShadow: '2px 7px 20px #ccc',
  },
  contentText:{
    padding: 2,
    fontSize: '20px',
    fontWeight: '500',
  }
}