import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { route } from './routes/routes'
import './scss/main.scss'
createRoot(document.getElementById('root')!).render(
    <RouterProvider router={route} />
)
