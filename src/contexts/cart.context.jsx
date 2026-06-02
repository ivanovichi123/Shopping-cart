import { createContext, useState } from "react";

const CartContext = createContext();

function CartContextWrapper(props) {
    const [cartNumber, setCartNumber] = useState(0);

    return (
        <CartContext.Provider value={{cartNumber, setCartNumber}}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextWrapper }