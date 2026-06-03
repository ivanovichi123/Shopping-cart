import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import styles from "../../styles/shopPage.module.css";
import Apple from "../../assets/Apple.svg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ShopPage = () => {
  const { cartItemList, setCartItemList } = useContext(CartContext);

  const [productsList, setProductsList] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const { cartNumber, setCartNumber } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      let productInformation = [1, 2, 3, 4, 19, 6, 7, 20, 9, 10, 11, 12];
      let ultimateInfo = [];
      let newCartItemList = structuredClone(cartItemList);

      try {
        let information = productInformation.map(async (productIndividual) => {
          return fetch(
            `https://fakestoreapi.com/products/${productIndividual}`,
          ).then((res) => res.json());
        });

        let answers = await Promise.all(information);

        for (let i = 0; i < answers.length; i++) {
          newCartItemList[i].Name = answers[i].title;
          newCartItemList[i].Img = answers[i].image;
        }

        setCartItemList(newCartItemList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
    if (isNaN(+e.target.value)) {
      newValue = 0;
    } else {
      newValue = numberUpLimit(+e.target.value);
    }
    modifiedList[index] = newValue;
    setProductsList(modifiedList);
  }

  function numberUpLimit(value) {
    if (value > 200) {
      return 200;
    }
    return value;
  }

  function numberDownLimit(value) {
    if (value < 0) {
      return 0;
    }
    return value;
  }

  function theFormSubmit(e) {
    e.preventDefault();
  }

  function theCartUp(index) {
    let productsAdd = 0;
    if (cartNumber === 200) {
      return;
    }
    let newCartItems = cartNumber + productsList[index];
    let newCartItemsList = structuredClone(cartItemList);
    productsAdd = productsList[index];
    if (newCartItems > 200) {
      productsAdd = 200 - cartNumber;
      newCartItems = 200;
    }
    newCartItemsList[index].Quantity += productsAdd;
    setCartNumber(newCartItems);
    setCartItemList(newCartItemsList);
  }

  return (
    <>
      <header className={styles.theHeader}>
        <h1>Shop</h1>
      </header>
      <NavBar cartItems={cartNumber} />
      <main className={styles.theMainContainer}>
        {cartItemList.map((individualProduct, index) => {
          return (
            <div key={individualProduct.Key} className={styles.Card}>
              <div className={styles.theDivTitle}>
                <p className={styles.theTitle}> {individualProduct.Name} </p>
              </div>
              <img
                className={styles.theImage}
                src={individualProduct.Img}
                alt={`I am ${individualProduct.Name}`}
              />
              <div className={styles.theDivForm}>
                <form
                  name="theForm"
                  className={styles.theForm}
                  onSubmit={() => theFormSubmit(event)}
                >
                  <button
                    className={styles.theMore}
                    onClick={() => productNumberGreater(index)}
                  >
                    +
                  </button>
                  <input
                    name="theInput"
                    className={styles.theInput}
                    type="tel"
                    value={productsList[index]}
                    onChange={() => inputChange(event, index)}
                  />
                  <button
                    className={styles.theLess}
                    onClick={() => productNumberLesser(index)}
                  >
                    -
                  </button>
                  <button
                    className={styles.theSubmit}
                    onClick={() => theCartUp(index)}
                  >
                    Add to cart
                  </button>
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
