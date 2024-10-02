import { FC } from "react"
import Header from "../../layouts/header/Header"
import Lessons from "../../componenst/lessons/Lessons"
import Bg from "../../componenst/ui/bg/Bg"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
const Home: FC = () => {
    let { theme } = useSelector((state: RootState) => state.main)
    return (
        <>
            <div className={`wrapper ${theme}`}>
                <Bg />
                <Header />
                <Lessons />
            </div>
        </>
    )
}

export default Home
