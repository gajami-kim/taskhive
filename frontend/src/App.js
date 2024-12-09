import './App.css';
import logo from './img/logo.png'
import { Route, Routes } from 'react-router-dom'
import Join from './routes/join/join.js'
import Login from './routes/login/login.js'

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
        </Routes>
      </section>
    </>
  );
}

export default App;
