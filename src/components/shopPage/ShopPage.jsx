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

  const [productsList, setProductsList] = useState([5,0,0,0,0,0,0,0,0,0,0,0]);

  function productNumberGreater(index) {
    let modifiedList = [...productsList];
    let newValue = numberUpLimit(modifiedList[index] + 1);
    modifiedList[index] = newValue;
    setProductsList(modifiedList);
  }

  function productNumberLesser(index) {
    let modifiedList = [...productsList];
    let newValue = numberDownLimit(modifiedList[index] - 1);
    modifiedList[index] = newValue;
    setProductsList(modifiedList);
  }

  function inputChange(e, index) {
    let newValue;
    let modifiedList = [...productsList];
    if(isNaN(+e.target.value)) {
      newValue = 0;
    } else {
      newValue = numberUpLimit(+e.target.value);
    }
    modifiedList[index] = newValue;
    setProductsList(modifiedList);
  }

  function numberUpLimit(value) {
    if(value > 200) {
      return 200;
    }
    return value;
  }

  function numberDownLimit (value) {
    if(value < 0) {
      return 0;
    }
    return value;
  }

  function theFormSubmit(e) {
    e.preventDefault();
  }

  // console.log("render");


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
                <form className={styles.theForm} onSubmit={() => theFormSubmit(event)}>
                  <button className={styles.theMore} onClick={() => productNumberGreater(index)}>+</button>
                  <input className={styles.theInput} type="tel" value={productsList[index]} onChange={() => inputChange(event,index)}/>
                  <button className={styles.theLess} onClick={() => productNumberLesser(index)}>-</button>
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
