import { FC, useEffect, useState } from "react"
import s from './Header.module.scss'
import { changeTheme, logOutWinStatus } from "../../store/main/mainSlice"
import { useDispatch, useSelector } from "react-redux"
import LogOut from "../../componenst/logOut/LogOut"
import { RootState } from "../../store/store"
import menuIcon from '../../assets/img/menu.svg'
import { ActionMeta } from 'react-select';
import SelectTheme from "../../componenst/ui/selectTheme/SelectTheme"
import closeIcon from '../../assets/img/closeIcon.svg'
export interface IOptions {
    value: string,
    label: string,
}
const options: IOptions[] = [
    { value: 'dark', label: 'Темная', },
    { value: 'light', label: 'Яркая', },
]

const Header: FC = () => {
    let { theme } = useSelector((state: RootState) => state.main)
    let savedTheme = localStorage.getItem('Target-theme')
    const [selectedOption, setSelectedOption] = useState({ value: 'dark', label: 'Темная', })
    const [menuStatus, setMenuStatus] = useState(false)
    const dispatch = useDispatch()
    const openModal = () => {
        dispatch(logOutWinStatus(true))
    }
    const selectTheme = (option: IOptions | null, actionMeta: ActionMeta<IOptions>) => {
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
                        <div className={s.header__nav_right}>
                            <p className={s.themeSelect__preText}>Тема:</p>
                            <SelectTheme
                                options={options}
                                selectedOption={selectedOption}
                                selectTheme={selectTheme}
                            />
                        </div>
                    </nav>
                </div>
            </header>
            <aside className={`${s.menu} ${menuStatus ? s.open : ''}`} >
               <img className={s.menu__closeIcon} src={closeIcon} onClick={() => setMenuStatus(false)} />
                <div className={s.menu__themeAndLogout}>
                    <div className={s.menu__theme}>
                        <p className={s.themeSelect__preText}>Тема:</p>
                        <SelectTheme
                            options={options}
                            selectedOption={selectedOption}
                            selectTheme={selectTheme}
                        />
                    </div>
                    <p className={s.menu__logOut} onClick={() => openModal()}>Выйти</p>
                </div>
            </aside>
            {menuStatus && <div className={s.closeAside} onClick={() => setMenuStatus(false)}></div>}
            <LogOut />
        </>
    )
}

export default Header
