import { useState } from 'react'
import {createBrowserRouter} from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './pages/Layout'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import VerifyEmail from './pages/VerifyEmail'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import './App.css'
import RegisterSeller from './pages/RegisterSeller'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element : <Layout/>,
      children:  [
        {
        path : "/",
          element : <Home/>
        },
        {
          path : "/about",
          element : <About/>
        },
        {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/register",
          element : <Register/>
        },
        {
          path : "/verify-email",
          element : <VerifyEmail/>
        },
        {
          path : "/add-product",
          element : <AddProduct/>
        },
        {
          path : "/products",
          element : <Products/>
        },
        {
          path : "/register-seller",
          element : <RegisterSeller/>
        }
      ]
    }

  ])
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
