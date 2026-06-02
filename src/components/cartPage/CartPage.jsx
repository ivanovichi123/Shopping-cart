import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import styles from "../../styles/cartPage.module.css";
import Delete from "../../assets/Delete.svg"

const CartPage = () => {
  const { cartNumber, SetCarNumber } = useContext(CartContext);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.theHeader}>
        <h1>Cart</h1>
      </header>
      <NavBar cartItems={cartNumber}/>
      <main className={styles.theMain}>
        <div className={styles.theContainer}>
          <p className={styles.theItem}>Item:</p>
          <p className={styles.theItemName}>Apple</p>
          <div className={styles.theChanges}>
            <button className={styles.theMore}>+</button>
            <button className={styles.theInput}>0</button>
            <button className={styles.theLess}>-</button>
          </div>
          <img src={Delete} alt="A trash Can" className={styles.theDelete}/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { CartPage }