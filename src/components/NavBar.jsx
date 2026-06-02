import Cart from "../assets/cart.svg";
import styles from "../styles/navBar.module.css";
import { Link } from "react-router";

const NavBar = (props) => {
  return (
    <nav className={styles.navigation}>
      <Link to="/home" className={styles.Home}>
        Home
      </Link>
      <Link to="/shop" className={styles.Shop}>
        Shop
      </Link>
      <div className={styles.divCart}>
        <div
          className={styles.cartItems}
          style={{
            width: props.cartItems >= 100 ? "30px" : "20px",
            display: props.cartItems === 0 ? "none" : "flex",
          }}
        >
          {props.cartItems}
        </div>
        <img className={styles.Cart} src={Cart} alt="A cart" />
      </div>
    </nav>
  );
};

export { NavBar };
