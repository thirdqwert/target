import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { route } from './routes/routes'
import './scss/main.scss'
import { Provider } from 'react-redux'
import { store } from './store/store'
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={route} />
    </Provider>
)
