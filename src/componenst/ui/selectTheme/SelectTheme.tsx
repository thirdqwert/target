import { FC } from "react"
import Select, { ActionMeta } from "react-select"
import { IOptions } from "../../../layouts/header/Header"
interface IProps {
    options: IOptions[],
    selectedOption: IOptions,
    selectTheme: (option: IOptions | null, actionMeta: ActionMeta<IOptions>) => void
}
const SelectTheme: FC<IProps> = ({ options, selectedOption, selectTheme }) => {
    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={selectTheme}
            styles={{
                control: (styles, state) => ({
                    ...styles,
                    border: '1px solid rgb(188, 188, 188)',
                    boxShadow: '1px solid rgb(188, 188, 188)',
                    '&:hover': {
                        border: '1px solid rgb(188, 188, 188)',
                    },
                    background: 'var(--bgAside)',
                    cursor: 'pointer',
                    width: '150px',
                    transition: '.3s'
                }),
                singleValue: (styles) => ({
                    ...styles,
                    color: 'var(--mainColor)',
                    transition: '.3s',
                    userSelect: 'none'
                }),
                option: (styles) => ({
                    ...styles,
                    ":active": {
                        background: 'pink',
                    },
                    color: 'var(--mainColor)',
                    background: 'var(--bgAside)',
                    padding: '10px',
                    margin: '0px',
                    cursor: 'pointer',
                    userSelect: 'none'
                }),
                menuList: (styles) => ({
                    ...styles,
                    padding: '0px',
                    margin: '0px',

                }),
                menu: (styles) => ({
                    ...styles,
                    margin: '0px',
                    border: '1px solid rgb(188, 188, 188)',
                    borderTop: 'none',
                    borderRadius: '0px'
                })
            }}
        />
    )
}

export default SelectTheme