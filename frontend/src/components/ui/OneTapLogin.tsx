import { CredentialResponse, GoogleLogin,useGoogleOneTapLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoggedIn } from './States/RecoilAtoms';

const OneTapLogin = ()=>{
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
    return <></>
}



export default OneTapLogin;