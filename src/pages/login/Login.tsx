import { FC, FormEvent, useState } from "react"
import { auth } from "../../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import s from './Login.module.scss'
import Cookies from "js-cookie"
const links = [
    {id:1,text:'Telegram',link:'https://t.me/Noziiishka'},
    {id:2,text:'Instagram',link:'https://www.instagram.com/nozima.mirimova/'},
    {id:3,text:'WhatsApp',link:''},
]
const Login: FC = () => {
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
        } catch (error) {
            setError(true)
        }
    }
    return (
        <>
            <section className={s.login}>
                <div className={s.login__cnt}>
                    <h2 className={s.login__title}>Войти</h2>
                    <form className={s.login__form} onSubmit={(event) => handleSubmit(event)}>
                        <input
                            type="text"
                            className={s.login__form_ipt}
                            placeholder="Логин"
                            onChange={(event) => setLogin(event.target.value)}
                        />
                        <input
                            type="password"
                            className={s.login__form_ipt}
                            placeholder="Пароль"
                            onChange={(event) => setPass(event.target.value)}
                        />
                        {error && <p>True</p>}
                        <button>Продолжить</button>
                    </form>
                    <div className={s.login__contacts}>
                        <div className={s.login__contacts_left}>
                            <p>+998 90 037 04 04</p>
                            <p>Nozima Target</p>
                        </div>
                        <div className={s.login__contacts_right}>
                            <ul>
                                {links.map((item,i)=> (
                                    <li key={item.id}><a href={item.link}>{item.text}</a></li>
                                ))}
                            </ul>
                        </div>                    
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
