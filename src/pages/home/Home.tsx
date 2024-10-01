import { FC } from "react"
import s from './Home.module.scss'
import Header from "../../layouts/header/Header"
import Lessons from "../../componenst/lessons/Lessons"
import Bg from "../../componenst/ui/bg/Bg"
const Home: FC = () => {

    return (
        <>
        <Bg/>
        <Header/>
        <Lessons/>
        </>
    )
}

export default Home
