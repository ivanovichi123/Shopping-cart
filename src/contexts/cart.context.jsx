import { createContext, useState } from "react";
import Apple from "../assets/Apple.svg";

const CartContext = createContext();

function CartContextWrapper(props) {
  //Variable that stores the total number of items in the cart
  const [cartNumber, setCartNumber] = useState(0);
  //Array of objects that store information of individual products
  const [cartItemList, setCartItemList] = useState([
    {
      Name: "A product",
      Key: 1,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 2,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 3,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 4,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 5,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 6,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 7,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 8,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 9,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 10,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 11,
      Quantity: 0,
      Img: Apple,
    },
    {
      Name: "A product",
      Key: 12,
      Quantity: 0,
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

export { CartContext, CartContextWrapper };
