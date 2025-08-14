import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <img src={item.img} alt={item.name} width="100" />
              <p>{item.name} - ₹{item.price} ({item.weight})</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
