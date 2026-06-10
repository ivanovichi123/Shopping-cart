import { createContext, useState } from "react";
import Apple from "../assets/Apple.svg";
import { CartContext } from "./cart.context";

function CartContextWrapperTest(props) {
  const [cartNumber, setCartNumber] = useState(100);
  const [cartItemList, setCartItemList] = useState([
    {
      Name: "Apple",
      Key: 1,
      Quantity: 10,
      Img: Apple,
    },
    {
      Name: "Cereal",
      Key: 2,
      Quantity: 30,
      Img: Apple,
    },
    {
      Name: "Cellphone",
      Key: 3,
      Quantity: 40,
      Img: Apple,
    },
    {
      Name: "Chair",
      Key: 4,
      Quantity: 20,
      Img: Apple,
    },
  ]);

  return (
    <CartContext.Provider
      value={{ cartNumber, setCartNumber, cartItemList, setCartItemList }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextWrapperTest };
