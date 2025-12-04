import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
import Auth from '../components/shared/Auth/Auth.jsx' 


import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth />
        <App />
      </Provider>
    </BrowserRouter>
  // </StrictMode>,
)
