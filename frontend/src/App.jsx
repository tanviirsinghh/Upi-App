import { BrowserRouter, Route, Routes } from "react-router-dom"

import Signin from './pages/Signin'
import SendMoney from './pages/SendMoney'
import Dashboard from './pages/Dashboard'

import Log from "./pages/Log"


function App() {

  return (

    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Log/>}/>
    <Route path='/signin' element={<Signin/>}/>   
      <Route path='/sendMoney' element={<SendMoney/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

      </Routes>
      </BrowserRouter>
  )
}

export default App
