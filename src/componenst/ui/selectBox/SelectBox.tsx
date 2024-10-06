import { FC } from "react"
import Select from "react-select"
interface IProps {
    options: any[],
    selectedOption: any,
    selectOption: (option: any) => void,
    boxWidth:string
}
const SelectBox: FC<IProps> = ({ options, selectedOption, selectOption, boxWidth }) => {
    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={selectOption}
            isSearchable={false}
            styles={{
                control: (styles, state) => ({
                    ...styles,
                    border: '1px solid rgb(188, 188, 188)',
                    boxShadow: '1px solid rgb(188, 188, 188)',
                    '&:hover': {
                        border: '1px solid rgb(188, 188, 188)',
                    },
                    background: 'transparent',
                    cursor: 'pointer',
                    width: boxWidth,
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

export default SelectBox