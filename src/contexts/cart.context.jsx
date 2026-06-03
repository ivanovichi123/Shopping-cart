import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextWrapper(props) {
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItemList, setCartItemList] = useState(
        [
            {
                Name: "Apple",
                Key: 1,
                Quantity: 0
            },
            {
                Name: "Cereal",
                Key: 2,
                Quantity: 0
            },
            {
                Name: "Water",
                Key: 3,
                Quantity: 0
            },
            {
                Name: "Cellphone",
                Key: 4,
                Quantity: 0
            },
            {
                Name: "Book",
                Key: 5,
                Quantity: 0
            },
            {
                Name: "Chips",
                Key: 6,
                Quantity: 0
            },
            {
                Name: "Cookies",
                Key: 7,
                Quantity: 0
            },
            {
                Name: "Watermelon",
                Key: 8,
                Quantity: 0
            },
            {
                Name: "Coffee",
                Key: 9,
                Quantity: 0
            },
            {
                Name: "Shirt",
                Key: 10,
                Quantity: 0
            },
            {
                Name: "Candy",
                Key: 11,
                Quantity: 0
            },
            {
                Name: "Television",
                Key: 12,
                Quantity: 0
            }
        ]
    )

    return (
        <CartContext.Provider value={{cartNumber, setCartNumber, cartItemList, setCartItemList}}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextWrapper }