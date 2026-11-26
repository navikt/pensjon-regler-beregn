import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import "@navikt/ds-css"
import './styles/app.css'
import './styles/guimodel.css'
import App from './App.tsx'
import {ThemeProvider} from "./theme/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
