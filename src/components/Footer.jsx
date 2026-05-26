import styles from "../styles/Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.theFooter}>
            <p>This page was made by ivanovichi productions</p>
            <p>Email: thisisnotarealemail@notgmail.com</p>
            <p>Enjoy the page</p>
            <p>Phone: 999-999-9999</p>
        </footer>
    )
}

export { Footer }