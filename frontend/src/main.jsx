import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Profile from './pages/profile.jsx'
import Login from './pages/login.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)