import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {DarkModeContextProvider} from './context/mode'
import ToasterContext from './context/ToasterContext.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/src/sweetalert2.scss'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <DarkModeContextProvider>
          <ToasterContext/>
            <App />
        </DarkModeContextProvider>
  </React.StrictMode>
)
