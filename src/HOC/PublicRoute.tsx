import Cookies from 'js-cookie'
import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PublicRoute: FC = () => {
    const navigate = useNavigate()
    let access_token = Cookies.get('stay_on_page')
    useEffect(() => {
        if (access_token && access_token !== null) {
            navigate('/')
        }
    }, [access_token])


    return <Outlet />
}

export default PublicRoute
