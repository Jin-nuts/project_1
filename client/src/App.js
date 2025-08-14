import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav";
import Upper from "./components/Upperbody"
import Lower from "./components/Lowerbody"
import Footer from "./components/Footer";
import Review from "./components/Review";
import Login from "./Pages/Login";
import AuthPage from "./Pages/Authpage";
import Cart from "./Pages/Cart";

function App() {
  return (
    
     
<BrowserRouter>

      <Routes>
        <Route path="/" element={
           <>
              <NavBar />
              <Upper />
              <Lower />
              <Review />
              <Footer />
            </>
        } />
        <Route path="/login" element={<Login />} />
         <Route path="/auth" element={<AuthPage />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>


    
  );
}

export default App;
