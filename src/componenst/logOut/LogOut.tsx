import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import s from './LogOut.module.scss'
import Cookies from "js-cookie"
import { logOutWinStatus } from "../../store/main/mainSlice"
import { useNavigate } from "react-router-dom"
const LogOut = () => {
    let { logOutWin } = useSelector((state: RootState) => state.main)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        Cookies.remove('stay_on_page')
        dispatch(logOutWinStatus(false))
        navigate('/login')
    }
    const closeModal = () => {
        dispatch(logOutWinStatus(false))
    }
    if (logOutWin) {
        return (
            <>
                <section className={s.logout} onClick={() => closeModal()}>
                    <div className={s.logout__cnt} onClick={(event) => event.stopPropagation()}>
                        <div className={s.logout__cnt_heading}>Вы точно хотите выйти?</div>
                        <div className={s.logout__cnt_btns}>
                            <button onClick={() => logout()}>Да</button>
                            <button onClick={() => closeModal()}>Нет</button>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default LogOut