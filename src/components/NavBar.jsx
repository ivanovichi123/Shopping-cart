import Cart from "../assets/cart.svg"
import styles from "../styles/navBar.module.css"
import { Link } from "react-router"

const NavBar = () => {
    return (
        <nav className={ styles.navigation }>
            <Link to = "home" className={ styles.Home }>Home</Link>
            <p className={ styles.Shop }>Shop</p>
            <img className={ styles.Cart } src={ Cart } alt="A cart" />
        </nav>
    )
}

export { NavBar }