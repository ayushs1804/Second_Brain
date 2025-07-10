import { useEffect } from "react";
import { NavBar } from "./components/ui/NavBar";
import { SignInComponent } from "./components/ui/SignInComponent";
import { SocialNetworkSignIn } from "./components/ui/SocialNetworkSignIn";
import { SignUpComponent } from "./components/ui/SignUpComponent";
import { useRecoilValueLoadable } from "recoil";
import { isLoggedIn } from "./components/ui/States/RecoilAtoms";
import { Loader } from "./components/ui/Loader";
import { useNavigate } from "react-router-dom";

const SignUpPage = ()=>{

    const navigate = useNavigate();

    useEffect(()=>{
        document.title = "SignUp";
    },[])
    


    return<>
    <div className="mb-5">
        <NavBar textButton1="SignIn"
         textButton2="Go To Home"
         onClickButton1={()=>{navigate("/signin")}}
         onClickButton2={()=>{navigate("/dashboard")}}
         />
    </div>
    <div className="w-screen h-screen flex justify-center items-center flex-wrap">
    <div className="flex justify-around items-center h-[600px] w-[1200px] border-solid border border-black p-4 rounded-lg bg-purple-300">
        <SocialNetworkSignIn/>
        <SignUpComponent/>
    </div></div>
    
    
   
        

    </>
}

export default SignUpPage;