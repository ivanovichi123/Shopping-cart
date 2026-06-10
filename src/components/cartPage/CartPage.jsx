import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import styles from "../../styles/cartPage.module.css";
import Delete from "../../assets/Delete.svg";

const CartPage = () => {
  //Global variables form the context to check the number of items and the list of them
  const { cartNumber, setCartNumber } = useContext(CartContext);
  const { cartItemList, setCartItemList } = useContext(CartContext);

  //Function that adds one quantity
  function cartNumberGreater(index) {
    //Temporal variables
    let newCartItemValue, newCartValue;
    let newCartItemList = structuredClone(cartItemList);
    //Call a function that checks if the new number is less than 200 and greater than -1
    [newCartValue, newCartItemValue] = theChecker(
      cartNumber + 1,
      cartItemList[index].Quantity + 1,
    );
    //Check if the values remain the same to not call a rerender
    if (
      newCartValue === cartNumber &&
      newCartItemList[index].Quantity === newCartItemValue
    ) {
      return;
    }
    //Update the values and set the new values
    newCartItemList[index].Quantity = newCartItemValue;
    setCartNumber(newCartValue);
    setCartItemList(newCartItemList);
  }

  //Functions that subtracts one quantity
  function cartNumberLesser(index) {
    //Temporal variables
    let newCartItemValue, newCartValue;
    let newCartItemList = structuredClone(cartItemList);
    //Call a function that checks if the new number is less than 200 and greater than -1
    [newCartValue, newCartItemValue] = theChecker(
      cartNumber - 1,
      cartItemList[index].Quantity - 1,
    );
    //Check if the values remain the same to not call a rerender
    if (
      newCartValue === cartNumber &&
      newCartItemList[index].Quantity === newCartItemValue
    ) {
      return;
    }
    //Update the values and set the new values
    newCartItemList[index].Quantity = newCartItemValue;
    setCartNumber(newCartValue);
    setCartItemList(newCartItemList);
  }

  //Function that checks if the numbers are less than 200 and greater than -1
  function theChecker(numberCart, numberList) {
    if (numberCart > 200) {
      return [200, numberList - 1];
    }
    if (numberCart < 0) {
      return 0;
    }
    return [numberCart, numberList];
  }

  //Function that deletes all the quantity of an item
  function deleteQuantity(index) {
    //Copy the array of items
    let newCartItemList = structuredClone(cartItemList);
    //Get the quantity of the item
    let numberCartDown = newCartItemList[index].Quantity;
    //Set the quantity as zero
    newCartItemList[index].Quantity = 0;
    //Update the values
    setCartNumber(cartNumber - numberCartDown);
    setCartItemList(newCartItemList);
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.theHeader}>
        <h1>Cart</h1>
      </header>
      <NavBar cartItems={cartNumber} />
      <main className={styles.theMain}>
        {cartItemList.map((individualProduct, index) => {
          return (
            <div
              data-testid="Element"
              key={individualProduct.Key}
              className={styles.theContainer}
              style={{
                display: individualProduct.Quantity === 0 ? "none" : "grid",
              }}
            >
              <p className={styles.theItem}>Item:</p>
              <p className={styles.theItemName}>{individualProduct.Name}</p>
              <div className={styles.theChanges}>
                <button
                  className={styles.theMore}
                  onClick={() => cartNumberGreater(index)}
                >
                  +
                </button>
                <button className={styles.theInput}>
                  {individualProduct.Quantity}
                </button>
                <button
                  className={styles.theLess}
                  onClick={() => cartNumberLesser(index)}
                >
                  -
                </button>
              </div>
              <img
                src={Delete}
                alt="A trash Can"
                className={styles.theDelete}
                onClick={() => deleteQuantity(index)}
              />
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
};

export { CartPage };
