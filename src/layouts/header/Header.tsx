import { FC } from "react"
import s from './Header.module.scss'
import { Link } from "react-router-dom"
const Header: FC = () => {
    return (
        <>
            <header className={s.header}>
                <div className="container">
                    <nav className={s.header__nav}>
                        <h2 className={s.header__logo}>Target</h2>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
