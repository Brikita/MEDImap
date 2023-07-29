import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

import './index.css'
if(process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/dash/:id/*' element={<App />} />
         <Route path='/' element={<Home />} />
         <Route path='/about' element={<About />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
