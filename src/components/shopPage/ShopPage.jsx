import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import styles from "../../styles/shopPage.module.css";
import Apple from "../../assets/Apple.svg";

const ShopPage = () => {
  const products = ["Apple", "Cereal", "Water"];
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
              <p className={styles.theTitle}> I am the {individualProduct} </p>
              <img
                className={styles.theImage}
                src={Apple}
                alt={`I am ${individualProduct}`}
              />
              <form>
                <button className={styles.theMore}>+</button>
                <input className={styles.theInput} type="number" />
                <button className={styles.theLess}>-</button>
                <button className={styles.theSubmit}>Add to cart</button>
              </form>
            </div>
          );
        })}
      </main>
      <Footer />
    </>
  );
};

export { ShopPage };
