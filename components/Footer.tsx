import styles from './Footer.module.scss'
import React from 'react'

const Footer: React.FC<{}> = () => {
    return (
        <footer className={styles.footer}>
            <p>My footer stuff</p>
        </footer>
    )
}

export default Footer;
