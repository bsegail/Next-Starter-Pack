import styles from './Input.module.scss';
import React, {ChangeEvent, useEffect, useState} from "react";

const Input: React.FC<{
    onChange: (value: string) => any,
    value: any,
    id: string
}> = ({onChange, value}) => {
    const [inputValue, setInputValue] = useState(value)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)
        onChange(value)
    }

    return (
        <div className={styles.input}>
            <input type='text' onChange={handleChange} value={inputValue} />
        </div>
    )
}

export default Input
