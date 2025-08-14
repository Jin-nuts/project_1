import React from "react";
import "./Upperbody.css"; // We'll create this CSS file next
import productImage from "../assets/i1.jpg"; // Use your actual image path
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
const UpperBody = () => {


  const { isAuthenticated } = useAuth();
const navigate = useNavigate();

const handleBuyNow = () => {
  if (!isAuthenticated) {
    navigate("/auth"); // new combined login/signup page
  } else {
    window.open(
      "https://www.instagram.com/himalayannuts.np?igsh=bHVubnMzZG93Mjhm&utm_source=qr",
      "_blank"
    ); // opens Instagram DM in a new tab
  }
};



  return (
    <section className="upperbody-container">
      <div className="upperbody-left">
        <img src={productImage} alt="Himalayan Makhana" className="product-image" />
      </div>

      <div className="upperbody-right">
        <h2>Himalayan Makhana</h2>
        <p>
          Pure Crunch. Himalayan Touch. Enjoy the healthiest, low-fat, gluten-free snack packed with antioxidants and protein.
        </p>
        <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </section>
  );
};

export default UpperBody;
