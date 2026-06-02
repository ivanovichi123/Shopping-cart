import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartPage = () => {
  const { cartNumber, SetCarNumber } = useContext(CartContext);

  return (
    <>
      <header>
        <h1>Cart</h1>
      </header>
      <NavBar cartItems={cartNumber}/>
      <main>
        <p>Hello</p>
      </main>
      <Footer />
    </>
  );
};

export { CartPage }