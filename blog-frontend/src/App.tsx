import Header from "./components/header/Header"
import Homepage from "./components/home/Homepage"
import Blogs from "./components/blogs/Blogs"
import Footer from "./components/home/Footer"
import {Routes, Route} from 'react-router-dom'
import Auth from "./components/auth/Auth"


function App() {
  return (
    <div>
      <header>
        <Header/>
      </header>
        {/* <Homepage/> */}
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      <footer>
      <Footer/>
      </footer>
    </div>
  );
}

export default App;
