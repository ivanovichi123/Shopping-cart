import { NavBar } from "../NavBar"
import { Footer } from "../Footer"

const ShopPage = () => {
    return(
        <>
            <header>
                <h1>Shop</h1>
            </header>
            <NavBar />
            <main>
                <div>
                    <img src="" alt="I am an image" />
                    <p>I am the name of the product</p>
                    <button>+</button>
                    <p>Quantity</p>
                    <button>-</button>
                    <p>Add to cart</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export { ShopPage }