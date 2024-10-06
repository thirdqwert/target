import { FC, useEffect, useState } from "react"
import s from './Lessons.module.scss'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setCrntModule } from "../../store/main/mainSlice"
import SelectBox from "../ui/selectBox/SelectBox"
import { useMediaQuery } from "react-responsive"

let data = {
    modules: 7,
}
const Lessons: FC = () => {
    let { crntModule } = useSelector((state: RootState) => state.main)
    const [selectedOption, setSelectedOption] = useState({ value: 1, label: `Модуль - 1` })
    let dispatch = useDispatch()
    // автоматически получаю количество модулей
    let modules = [...new Array(data.modules)].map((_, i) => { return { value: i + 1, label: `Модуль - ${i + 1}`, } })
    const navigate = useNavigate()
    const location = useLocation()
    const screenSize = useMediaQuery({ minWidth: 991 })
    const selectModule = (option: any) => {
        if (option) {
            dispatch(setCrntModule(option.value))
            setSelectedOption(option)
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        let moduleValue = Number(params.get('module')) || 1
        dispatch(setCrntModule(moduleValue))
        let obj = modules.find((item) => item.value == moduleValue)
        obj && setSelectedOption(obj)
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
                    {screenSize ?
                        <ul className={s.lessons__modules}>
                            {modules && modules.map((item) => (
                                <li
                                    className={crntModule == item.value ?
                                        `${s.lessons__modules_li} ${s.active}`
                                        :
                                        s.lessons__modules_li} key={item.value}
                                    onClick={() => selectModule(item)}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        :
                        <SelectBox
                            selectedOption={selectedOption}
                            options={modules}
                            selectOption={selectModule}
                            boxWidth='100%'
                        />}
                    <div className={s.lessons__cnt}>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Lessons
