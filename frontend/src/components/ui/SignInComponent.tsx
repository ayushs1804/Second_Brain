import { useForm } from "react-hook-form"
import Button from "./Button"
import { InputComponent } from "./InputComponent"
import { useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { isCorrect, isLoggedIn, triggerLoggedInCheck } from "./States/RecoilAtoms";
import { useEffect } from "react";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";

interface SignInType{
    username:string;
    password:string;
    rememberMe:boolean;

}

export const SignInComponent = ()=>{
    const setIsCorrect = useSetRecoilState(isCorrect);
    const navigate = useNavigate();
    const setTrigger = useSetRecoilState(triggerLoggedInCheck);
    
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    } = useForm<SignInType>();
    
    const handleFormSubmit = async (e:SignInType)=>{
        const data = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signin",{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json",
                "credentials":"true"
            },
            body:JSON.stringify({
                username:e.username,
                password:e.password
            })
        }).then(res=>res.json()).then(res=>res).catch(err=>console.log(err));

        if(data.value===true){
            console.log("verified")
            setIsCorrect(true);
            setTrigger(e=>e-1);
            navigate("/dashboard");
        }
        else{
            setIsCorrect(false);
            console.log("Wrong Credentials");
        }
    }

    return <div className="flex justify-center items-center border-solid bg-white border-black border-2 w-[35%] h-[90%] rounded-lg">
                <div className=" flex justify-center  h-[99%] w-[90%]  ">
                    <div className="h-full w-full flex flex-col justify-around items-center mt-5">

                        <div className="flex   text-4xl font-bold"><u>SignIn</u></div>

                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="flex flex-col justify-around  h-[200px]">
                                <div>
                                    <label className="text-lg">Enter Username: </label>
                                    <input className="w-[59%] border-2 border-black rounded-xl pl-1 py-1"
                                    {...register("username")}
                                    required={true}
                                    />
                                    
                                </div>
                                
                                <div>
                                    <label className="text-lg">Enter Password: </label>
                                    <input className="w-[60%] border-2 border-black rounded-xl pl-1 py-1"
                                    type="password" 
                                    {...register("password")}
                                    required={true}
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input className="mr-1 h-[20px] border-2 border-black" type="checkbox"
                                    {...register("rememberMe")}/>
                                    <label>Remember Me</label>
                                </div>

                                <div className="flex justify-center">
                                    <Button text="SignIn" type="submit" sizeButton="lg" className = "px-4 py-4 text-lg"
                                    varient={isSubmitting?"disabled":"default"} disabled={isSubmitting} isLoading={isSubmitting}
                                    />
                                </div>
                                
                                
                                
                            </div>
                        </form>

                        <div className="flex justify-center mr-3 h-[1rem] w-full pt-10">
                                    <p className="text-sm">
                                    Don't have an account?? <a href="#" className="text-purple-600">SignUp</a> for free
                                    </p>
                        </div>
                        
                    </div>
                    
                    
                </div>
            
                  
        </div>
        

        
    
}