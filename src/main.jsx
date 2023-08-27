import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import { Globalprovider } from './Usecontent.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './pages/Home.jsx'


const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
    
    // {
    //   index: true,
    //   element: <LoginPage />
    //   },
  
    
      {
        path: "/login",
        element: <Login />
      },
    
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/register",
        element: <Register />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Globalprovider>
        <RouterProvider router={routerProvider} />
    </Globalprovider>
  
    
  </React.StrictMode>,
)
