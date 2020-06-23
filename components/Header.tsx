import styles from './Header.module.scss'
import React from 'react';

const Header: React.FC<{}> = ({ }) => {
    return (
        <header className={styles.header}>
            <h1>My logo</h1>
        </header>
    )
}

export default Header
