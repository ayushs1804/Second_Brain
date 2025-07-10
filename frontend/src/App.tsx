import './App.css'
import React from 'react'
const ContentPage = React.lazy(()=>import("./ContentPage"));
const LandingPage = React.lazy(()=>import("./LandingPage"));
const SignInPage = React.lazy(()=>import("./SignInPage"));
const SignUpPage = React.lazy(()=>import("./SignUpPage"));
import { Router,Routes,Route,BrowserRouter } from 'react-router-dom'
import { Loader } from './components/ui/Loader';



function App() {
  console.log()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={
            // @ts-ignore
            <React.Suspense fallback={<Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>}>
                <ContentPage/>
            </React.Suspense>
            }/>
          <Route path='/signin' element = {
            // @ts-ignore
            <React.Suspense fallback={<Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>}>
                <SignInPage/>
            </React.Suspense>
            }/>
          <Route path='/signup' element = {
            // @ts-ignore
            <React.Suspense fallback={<Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>}>
                <SignUpPage/>
            </React.Suspense>
            }/>
          <Route path='/landingPage' element = {
            // @ts-ignore
            <React.Suspense fallback={<Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>}>
                <LandingPage/>
            </React.Suspense>
            }/>
          <Route path='/' element = {
            
            // @ts-ignore
            <React.Suspense fallback={<Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>}>
                <LandingPage/>
            </React.Suspense>
            }/>
          <Route path='/*' element = {<div className='flex justify-center items-center'>
            OOPS!Wrong Adress
          </div>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
