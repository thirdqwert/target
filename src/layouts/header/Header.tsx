import { FC, useEffect, useState } from "react"
import s from './Header.module.scss'
import { changeTheme, logOutWinStatus } from "../../store/main/mainSlice"
import { useDispatch, useSelector } from "react-redux"
import LogOut from "../../componenst/logOut/LogOut"
import { RootState } from "../../store/store"
import menuIcon from '../../assets/img/menu.svg'
import SelectBox from "../../componenst/ui/selectBox/SelectBox"
import closeIcon from '../../assets/img/closeIcon.svg'
import { useMediaQuery } from "react-responsive"
export interface IOptions {
    value: string,
    label: string,
}
const options: IOptions[] = [
    { value: 'dark', label: 'Темная', },
    { value: 'light', label: 'Яркая', },
]

const Header: FC = () => {
    const savedTheme = localStorage.getItem('Target-theme')
    let { theme } = useSelector((state: RootState) => state.main)
    const [selectedOption, setSelectedOption] = useState({ value: 'dark', label: 'Темная', })
    const [menuStatus, setMenuStatus] = useState(false)
    const dispatch = useDispatch()
    const screenSize = useMediaQuery({ minWidth: 991 })
    const openModal = () => {
        dispatch(logOutWinStatus(true))
    }
    const selectTheme = (option: any) => {
        if (option) {
            setSelectedOption(option)
            dispatch(changeTheme(option.value))
        }
    }
    useEffect(() => {
        if (savedTheme) {
            let obj = options.find((item) => item.value == savedTheme)
            obj && setSelectedOption(obj)
        }
    }, [savedTheme])

    return (
        <>
            <header className={s.header}>
                <div className="container">
                    <nav className={s.header__nav}>
                        <div className={s.header__nav_left}>
                            <h2 className={s.header__logo}>Target</h2>
                            <div className={s.menu__icon} onClick={() => setMenuStatus(true)}><img src={menuIcon} alt="" /></div>
                        </div>
                        {screenSize &&
                            <div className={s.header__nav_right}>
                                <p className={s.themeSelect__preText}>Тема:</p>
                                <SelectBox
                                    options={options}
                                    selectedOption={selectedOption}
                                    selectOption={selectTheme}
                                    boxWidth='150px'
                                />
                            </div>
                        }
                    </nav>
                </div>
            </header>
            <aside className={`${s.menu} ${menuStatus ? s.open : ''}`} >
                <img className={s.menu__closeIcon} src={closeIcon} onClick={() => setMenuStatus(false)} />
                <div className={s.menu__themeAndLogout}>
                    {!screenSize &&
                        <div className={s.menu__theme}>
                            <p className={s.themeSelect__preText}>Тема:</p>
                            <SelectBox
                                options={options}
                                selectedOption={selectedOption}
                                selectOption={selectTheme}
                                boxWidth='150px'
                            />
                        </div>
                    }
                    <p className={s.menu__logOut} onClick={() => openModal()}>Выйти</p>
                </div>
            </aside>
            {menuStatus && <div className={s.closeAside} onClick={() => setMenuStatus(false)}></div>}
            <LogOut />
        </>
    )
}

export default Header
