import { CredentialResponse, GoogleLogin,useGoogleOneTapLogin } from '@react-oauth/google';
import Button from './Button';
import { application } from 'express';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoggedIn } from './States/RecoilAtoms';



export const SocialNetworkSignIn = ()=>{
    const setIsLoggedInVal = useSetRecoilState(isLoggedIn);
    const navigate = useNavigate();
    
    useGoogleOneTapLogin({
            onSuccess:async credentialResponse => {
                // console.log(credentialResponse.credential);
                const data = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/decodeJwt",{
                    method:"GET",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type":"application/json",
                        "credentials":"include",
                        "token":`${credentialResponse.credential}`
                    }
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{
                    // console.log(res);
                    return res;
                })
                
                const trySignIn = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/googleAuth",{
                    method:"POST",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({
                        email:data.decoded.email,
                        name:data.decoded.name,
                        username:data.decoded.name
                    })
                }).then(res=>res.json()).then(res=>res).catch(err=>console.log(err));
                // console.log(trySignIn);
                if(trySignIn?.value===true){
                    setIsLoggedInVal(true);
                    navigate("/dashboard")
                }
            },
            onError: () => {
                console.log('Login Failed');
            },
        })


    return <div className=" flex flex-col justify-around items-center ml-8 h-[50%] w-[35%] border-solid border-2 rounded-2xl border-black bg-white text-black">
            <div>
                <div className='text-2xl font-bold flex justify-center mb-6'>
                <u>SignIn/SignUp</u>
                </div>
                <div className='text-sm align-middle flex justify-center h-[2rem] w-[250px] items-center '>
                    <p className="">Use Social Media Networks to SignIn to Second Brain Platform</p>
                </div>
                
            </div>
            <div className='flex justify-center items-center'>
                <GoogleLogin
                onSuccess={
                    async (credentialResponse:CredentialResponse)=>{
                    // console.log(credentialResponse.credential);

                    const data = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/decodeJwt",{
                    method:"GET",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type":"application/json",
                        "credentials":"include",
                        "token":`${credentialResponse.credential}`
                    }
                    }).then((res)=>{
                        return res.json()
                    }).then((res)=>{
                        return res;
                    })
            
                    const trySignIn = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/googleAuth",{
                    method:"POST",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({
                        //@ts-ignore
                        email:data.decoded.email,
                        name:data.decoded.name,
                        username:data.decoded.name,
                    })
                }).then(res=>res.json()).then(res=>res).catch(err=>console.log(err));
                // console.log(trySignIn);
                if(trySignIn?.value===true){
                    setIsLoggedInVal(true);
                    navigate("/dashboard")
                }
            
        }}
                onError={()=>{
                    console.log("error")
                }}
                
                theme='filled_blue'
                shape="rectangular"
                text="signin_with"
                logo_alignment="center"
                width="300px"
                size="large"
                useOneTap
                >
                </GoogleLogin>
            </div>

            
            
            {/* <Button text = {"Sign in with Google 🚀"} onClick={() => login()}></Button> */}
    </div>
}