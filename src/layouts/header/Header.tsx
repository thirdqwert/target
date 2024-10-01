import { FC } from "react"
import s from './Header.module.scss'
import { changeTheme, logOutWinStatus } from "../../store/main/mainSlice"
import { useDispatch, useSelector } from "react-redux"
import LogOut from "../../componenst/logOut/LogOut"
import { RootState } from "../../store/store"
const Header: FC = () => {
    let { theme } = useSelector((state: RootState) => state.main)
    const dispatch = useDispatch()
    const openModal = () => {
        dispatch(logOutWinStatus(true))
    }
    return (
        <>
            <header className={s.header}>
                <div className="container">
                    <nav className={s.header__nav}>
                        <h2 className={s.header__logo}>Target</h2>
                        <div className={s.header__themeAndLogout}>
                            <div className={s.header__theme} onClick={() => dispatch(changeTheme())}>
                                <span className={theme == 'dark' ? s.dark : s.light}></span>
                            </div>
                            <p onClick={() => openModal()}>Выйти</p>
                        </div>
                    </nav>
                </div>
            </header>
            <LogOut />
        </>
    )
}

export default Header
