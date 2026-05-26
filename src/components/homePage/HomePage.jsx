import { NavBar } from "../NavBar"
import Chef from "../../assets/Chef.svg"
import styles from "../../styles/homePage.module.css"

const HomePage = () => {
    return (
        <>
            <header className={ styles.theHeader }> 
                <h1>Shopping Cart</h1>
            </header>
            <NavBar />
            <main className={ styles.theMain }>
                <p className={ styles.theText1 }>Hi, this a simple page made in react that simulates a shopping page in which you can navigate through different products and select the ones you want with the quantity.
                    All the products you choose you decide will be store in the cart for you to see the products you select and giving you the chance to change the quantity. The page is divided in three sections,
                    the home is just a simple introduction and welcome to the user, the shop is where the products are for you tu select them and the cart is where you can see the selected items. Have fun going
                    through the page.
                </p>
                <img className={ styles.theMainImage } src = {Chef} alt = "An image" />
                <p className={styles.theText2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iste facere. Eos enim iste sit quasi ea maxime ad quod distinctio aut? Voluptatum aspernatur nulla praesentium officia veniam maxime magni.</p>
            </main>
            <footer className={styles.theFooter}>
                <p>This page was made by ivanovichi productions</p>
                <p>Email: thisisnotarealemail@notgmail.com</p>
                <p>Enjoy the page</p>
                <p>Phone: 999-999-9999</p>
            </footer>
        </>
    )
}

export { HomePage }