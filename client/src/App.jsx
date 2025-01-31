import { useState } from 'react'
import {createBrowserRouter} from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './pages/layout'

import './App.css'

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
