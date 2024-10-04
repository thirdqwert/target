import { FC, FormEvent, useState } from "react"
import { auth } from "../../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import s from './Login.module.scss'
import Cookies from "js-cookie"
import Bg from "../../componenst/ui/bg/Bg"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
const links = [
    { id: 1, text: 'Telegram', link: '' },
    { id: 2, text: 'Instagram', link: '' },
    // { id: 3, text: 'WhatsApp', link: '' },
]
const Login: FC = () => {
    let { theme } = useSelector((state: RootState) => state.main)
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(false)
    let navigate = useNavigate()
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, login, pass)
            navigate('/')
            Cookies.set('stay_on_page', 'true', { expires: 7 });
            setError(false)
        } catch (error) {
            setError(true)
        }
        setLogin('')
        setPass('')
    }
    return (
        <>
            <div className={`wrapper ${theme}`}>
                <Bg />
                <section className={s.login}>
                    <div className={s.login__cnt}>
                        <h2 className={s.login__title}>Войти</h2>
                        <form className={s.login__form} onSubmit={(event) => handleSubmit(event)}>
                            <input
                                type="text"
                                className={s.login__form_ipt}
                                placeholder="Логин"
                                value={login}
                                onChange={(event) => setLogin(event.target.value)}
                            />
                            <input
                                type="text"
                                className={s.login__form_ipt}
                                placeholder="Пароль"
                                value={pass}
                                onChange={(event) => setPass(event.target.value)}
                            />
                            {error && <p className={s.error_text}>Логин или Пароль введен не правильно!!</p>}
                            <button>Продолжить</button>
                        </form>
                        <div className={s.login__contacts}>
                            <div className={s.login__contacts_left}>

                            </div>
                            <div className={s.login__contacts_right}>
                                <ul>
                                    {links.map((item, i) => (
                                        <li key={item.id}><a href={item.link}>{item.text}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div >
                </section >
            </div>
        </>
    )
}

export default Login
