import { FC, useState } from "react"
import s from './Lessons.module.scss'


let data = {
    modules: 7,
}
const Lessons: FC = () => {
    const [crntModule, setCrntModule] = useState(1)
    // автоматически получаю количество модулей
    let modules = [...new Array(data.modules)].map((_, i) => { return { id: i + 1, moduleText: i + 1, } })

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
                                onClick={() => setCrntModule(item.id)}
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
