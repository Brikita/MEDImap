import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/dash/*' element={<App />} />
         <Route path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
