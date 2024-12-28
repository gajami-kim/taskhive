import './App.css';
import logo from './img/logo.png'
import { Route, Routes } from 'react-router-dom'
import Join from './routes/join/join.js'
import Join2 from './routes/join/join2.js'
import Login from './routes/login/login.js'
import { useEffect } from 'react';
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <section className='main'>
        <section>
          <img src={logo} className='logo' />
          <p className='title'>TaskHIVE</p>
        </section>
        {/* <Login /> */}
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
          <Route path='/join2' element={<Join2 />}></Route>
        </Routes>
      </section>
      <ToastContainer/>
    </>
  );
}

export default App;
