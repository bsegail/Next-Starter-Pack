import styles from './Button.module.scss';
import React from 'react';
import classNames from "classnames";
import Loading from "./Loading";

const Button: React.FC<{
    working?: boolean,
    type?: 'button' | 'submit'
}> = ({ children, working=false, type='button' }) => {
    return (
        <button type={type} className={classNames([styles.button, {
            [styles.workingButton]: working
        }])}><Loading value={working} lottieClassName={styles.lottie}/>{ children }</button>
    )
}

export default Button
