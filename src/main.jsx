import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router.jsx'
import Authprovider from './Provider/Authprovider.jsx'


createRoot(document.getElementById('root')).render(
  <Authprovider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Authprovider>,
)
