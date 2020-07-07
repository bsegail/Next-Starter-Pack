import { default as SelectBase } from "react-select";
import {useState} from "react";
import { find } from "lodash";

type Option = {
    label: string
    value: any
}
const valueWithOptions = (value: any, options: Option[]) => {
    return find(options, { value })
}

const Select: React.FC<{
    value: any,
    onChange: any,
    options: Option[]
    [key: string]: any
}> = ({ value, onChange, ...props }) => {
    const { options } = props
    const [inputValue, setInputValue] = useState(valueWithOptions(value, options))
    const handleChange = (v: any) => {
        setInputValue(v)
        onChange(v.value)
    }
    return (
        <SelectBase
            {...props}
            onChange={handleChange}
            value={inputValue}
        />
    )
}

export default Select
