import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import styles from "../../styles/cartPage.module.css";
import Delete from "../../assets/Delete.svg";

const CartPage = () => {
  const { cartNumber, setCartNumber } = useContext(CartContext);
  const { cartItemList, setCartItemList } = useContext(CartContext);

  function cartNumberGreater(index) {
    let newCartItemValue, newCartValue;
    let newCartItemList = structuredClone(cartItemList);
    [newCartValue, newCartItemValue] = theChecker(
      cartNumber + 1,
      cartItemList[index].Quantity + 1,
    );
    if (
      newCartValue === cartNumber &&
      newCartItemList[index].Quantity === newCartItemValue
    ) {
      return;
    }
    newCartItemList[index].Quantity = newCartItemValue;
    setCartNumber(newCartValue);
    setCartItemList(newCartItemList);
  }

  function cartNumberLesser(index) {
    let newCartItemValue, newCartValue;
    let newCartItemList = structuredClone(cartItemList);
    [newCartValue, newCartItemValue] = theChecker(
      cartNumber - 1,
      cartItemList[index].Quantity - 1,
    );
    if (
      newCartValue === cartNumber &&
      newCartItemList[index].Quantity === newCartItemValue
    ) {
      return;
    }
    newCartItemList[index].Quantity = newCartItemValue;
    setCartNumber(newCartValue);
    setCartItemList(newCartItemList);
  }

  function theChecker(numberCart, numberList) {
    if (numberCart > 200) {
      return [200, numberList - 1];
    }
    if (numberCart < 0) {
      return 0;
    }
    return [numberCart, numberList];
  }

  function deleteQuantity(index) {
    let newCartItemList = structuredClone(cartItemList);
    let numberCartDown = newCartItemList[index].Quantity;
    newCartItemList[index].Quantity = 0;
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
