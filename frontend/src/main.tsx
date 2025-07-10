import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RecoilRoot } from 'recoil'


createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
         <GoogleOAuthProvider clientId={import.meta.env.VITE_GoogleAuthClientID}>
            {/* <div className=''> */}
                <App />
            {/* </div> */}
        </GoogleOAuthProvider>
    </RecoilRoot>
   

)
