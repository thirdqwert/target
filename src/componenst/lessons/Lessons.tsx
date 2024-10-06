import { FC, useEffect, useState } from "react"
import s from './Lessons.module.scss'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setCrntModule } from "../../store/main/mainSlice"

let data = {
    modules: 7,
}
const Lessons: FC = () => {
    let {crntModule} = useSelector((state:RootState) => state.main)
    let dispatch = useDispatch()
    // автоматически получаю количество модулей
    let modules = [...new Array(data.modules)].map((_, i) => { return { id: i + 1, moduleText: i + 1, } })
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        
        dispatch(setCrntModule(Number(params.get('module')) || 1))
    }, [location.search])

    useEffect(() => {
        const params = new URLSearchParams()

        crntModule != 1 && params.set('module', String(crntModule))

        navigate(`?${decodeURIComponent(params.toString())}`)
    }, [crntModule])

    return (
        <>
            <section className={s.lessons}>
                <div className="container">
                    <ul className={s.lessons__modules}>
                        {modules && modules.map((item) => (
                            <li
                                className={crntModule == item.id ?
                                    `${s.lessons__modules_li} ${s.active}`
                                    :
                                    s.lessons__modules_li} key={item.id}
                                onClick={() => dispatch(setCrntModule(item.id))}
                            >
                                Модуль - {item.moduleText}
                            </li>
                        ))}
                    </ul>
                    <div className={s.lessons__cnt}>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Lessons
