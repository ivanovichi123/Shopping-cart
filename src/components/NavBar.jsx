import Cart from "../assets/cart.svg"
import styles from "../styles/navBar.module.css"

const NavBar = () => {
    return (
        <nav className={ styles.navigation }>
            <p className={ styles.Home }>Home</p>
            <p className={ styles.Shop }>Shop</p>
            <img className={ styles.Cart } src={ Cart } alt="A cart" />
        </nav>
    )
}

export { NavBar }