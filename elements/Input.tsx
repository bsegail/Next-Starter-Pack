import styles from './Input.module.scss';
import React, {ChangeEvent} from "react";

const Input: React.FC<{
    onChange: (value: string) => any,
    value: any,
    id: string
}> = ({onChange, value}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        onChange(value)
    }
    return (
        <div className={styles.input}>
            <input type='text' onChange={handleChange} value={value}/>
        </div>
    )
}

export default Input
