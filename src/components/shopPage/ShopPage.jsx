import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import styles from "../../styles/shopPage.module.css";
import Apple from "../../assets/Apple.svg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ShopPage = () => {
  //Get the list of items form the context
  const { cartItemList, setCartItemList } = useContext(CartContext);

  //Variable to store the temporal quantities to add to the cart
  const [productsList, setProductsList] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  //Gte the total number of items in the cart from the context
  const { cartNumber, setCartNumber } = useContext(CartContext);

  //Use effect to call an API to get the images
  useEffect(() => {
    //Async function to call the API
    const fetchData = async () => {
      //AN array with the ids of the products
      let productInformation = [1, 2, 3, 4, 19, 6, 7, 20, 9, 10, 11, 12];
      let ultimateInfo = [];
      //Copy the array of items
      let newCartItemList = structuredClone(cartItemList);

      try {
        //Call the API and get a promise from every id
        let information = productInformation.map(async (productIndividual) => {
          return fetch(
            `https://fakestoreapi.com/products/${productIndividual}`,
          ).then((res) => res.json());
        });

        //Resolve all the promises
        let answers = await Promise.all(information);

        //Change the placeholders for the values from the API
        for (let i = 0; i < answers.length; i++) {
          newCartItemList[i].Name = answers[i].title;
          newCartItemList[i].Img = answers[i].image;
        }

        //Update the array
        setCartItemList(newCartItemList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    //Call the async function
    fetchData();
  }, []);

  //Functions that increases the quantity 
  function productNumberGreater(index) {
    //Copy the array
    let modifiedList = [...productsList];
    //Check if the new value is lesser than 200
    let newValue = numberUpLimit(modifiedList[index] + 1);
    //Change the value in the copy array
    modifiedList[index] = newValue;
    //Update the array
    setProductsList(modifiedList);
  }

  //Function that decreases the quantity
  function productNumberLesser(index) {
    //Copy the array
    let modifiedList = [...productsList];
    //Check if the new value is greater than -1
    let newValue = numberDownLimit(modifiedList[index] - 1);
    //Change the value in the copy array
    modifiedList[index] = newValue;
    //Update the array
    setProductsList(modifiedList);
  }

  //Function that changes the input
  function inputChange(e, index) {
    //Variable that stores the new value of the input
    let newValue;
    //Copy the array
    let modifiedList = [...productsList];
    //heck if the value is not a number
    if (isNaN(+e.target.value)) {
      newValue = 0;
    } else {
      //Check that the new value is lesser than 200
      newValue = numberUpLimit(+e.target.value);
    }
    //Change the value in the copy array
    modifiedList[index] = newValue;
    //Update the list
    setProductsList(modifiedList);
  }

  //Function that checks if the number is lesser than 200
  function numberUpLimit(value) {
    //If the number is greater than 200 return 200
    if (value > 200) {
      return 200;
    }
    return value;
  }

  //Function that checks if the number is greater than -1
  function numberDownLimit(value) {
    //If the number is lesser than 0 return 0
    if (value < 0) {
      return 0;
    }
    return value;
  }

  //Function that prevents the form default submit
  function theFormSubmit(e) {
    e.preventDefault();
  }

  //Function that increases the cart items
  function theCartUp(index) {
    //Variable that stores the quantity to add
    let productsAdd = 0;
    //If cart number is at its limit return
    if (cartNumber === 200) {
      return;
    }
    //Variable that add the total items in the cart with the one in the input
    let newCartItems = cartNumber + productsList[index];
    //Copy the array of objects
    let newCartItemsList = structuredClone(cartItemList);
    //Get the total of items to add to the cart
    productsAdd = productsList[index];
    //Check if the new total fo items is greater than 200
    if (newCartItems > 200) {
      //Check how much items can the cart get (if the cart is in 199, it means it can have 1 more item)
      productsAdd = 200 - cartNumber;
      //Set the total fo cart items at 200
      newCartItems = 200;
    }
    //Add to the array of objects the quantity of items the cart can get
    newCartItemsList[index].Quantity += productsAdd;
    //Update the variables
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
