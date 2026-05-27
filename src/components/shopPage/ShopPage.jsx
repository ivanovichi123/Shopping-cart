import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import styles from "../../styles/shopPage.module.css";
import Apple from "../../assets/Apple.svg";
import { useState } from "react";

const ShopPage = () => {
  const products = [
    "Apple",
    "Cereal",
    "Water",
    "Cellphone",
    "Book",
    "Chips",
    "Cookies",
    "Watermelon",
    "Coffee",
    "Shirt",
    "Candy",
    "Television",
  ];

  const []
  return (
    <>
      <header className={styles.theHeader}>
        <h1>Shop</h1>
      </header>
      <NavBar />
      <main className={styles.theMainContainer}>
        {products.map((individualProduct, index) => {
          return (
            <div key={index} className={styles.Card}>
              <div className={styles.theDivTitle}>
                <p className={styles.theTitle}> {individualProduct} </p>
              </div>
              <img
                className={styles.theImage}
                src={Apple}
                alt={`I am ${individualProduct}`}
              />
              <div className={styles.theDivForm}>
                <form className={styles.theForm}>
                  <button className={styles.theMore}>+</button>
                  <input className={styles.theInput} type="number" />
                  <button className={styles.theLess}>-</button>
                  <button className={styles.theSubmit}>Add to cart</button>
                </form>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </>
  );
};

export { ShopPage };
