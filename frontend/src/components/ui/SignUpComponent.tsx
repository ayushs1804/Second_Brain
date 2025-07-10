import { FieldValues, useForm } from "react-hook-form"
import Button from "./Button"
import { SignUpZod } from "./States/ZodValidictions";
import type { SignUpZodType } from "./States/ZodValidictions";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isCorrect } from "./States/RecoilAtoms";
import { useNavigate } from "react-router-dom";

//React.ChangeEvent<HTMLInputElement>

export const SignUpComponent = ()=>{
    const [isCorrectValue,setIsCorrect] = useRecoilState(isCorrect);
    const navigate = useNavigate();

    const{
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors,isSubmitting,isValid },
    setError,
    clearErrors
    } = useForm<SignUpZodType>({
        resolver:zodResolver(SignUpZod)
    });

    const validateEmail = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.value.includes("@")){
            setError("email",{message:"Email should contain @"});
            setIsCorrect(false);
        }
        else{
            await setTimeout(async ()=>{
                // console.log("email req");
                const res = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signin/findEmail",{
                    method:"GET",
                    headers:{
                        email:e.target.value
                    }
                }).then(res=>res.json()).then(res=>res);

                if(!res.value){
                    clearErrors("email");
                    setIsCorrect(true);
                }
                else{
                    setError("email",{message:"email already registered"})
                }
            },400)
        }
    }

    const validateUsername = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        await setTimeout(async ()=>{
            const data = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signin/findUser",{
                method:"GET",
                headers:{
                    "user":e.target.value
                }
            }).then((res)=>res.json()).then(res=>res);
            // console.log(data.value);

            //@ts-ignore
            if(data.value){
                setError("username",{message:"Username already Exists"});
                // isCorrect.current = false;
                setIsCorrect(false);
            }
            else{
                clearErrors("username");
                // isCorrect.current = true;
                setIsCorrect(true);
            }
        },400)
    }

    useEffect(() => {
        setIsCorrect(
                !errors.name &&
                !errors.username &&
                !errors.password &&
                !errors.email &&
                !errors.age
        );
    }, [errors.age,errors.email,errors.name,errors.password,errors.username]);


    const handleFormSubmit = async (data:unknown)=>{
        setTimeout(async ()=>{
            const res = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "credentials":"true"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json()).then(res=>res)
            .catch(err=>console.log({
                error:err
            }))
            console.log(res);
            if(res.value){
                navigate("/signin")
            }
        },2000);
        reset();
    }
    
    return <div className="flex justify-center items-center border-solid bg-white border-black border-2 w-[35%] h-[95%] rounded-lg">
    <div className=" flex justify-center  h-[99%] w-[90%]  ">
        <div className="h-full w-full flex flex-col justify-around items-center ">

            <div className="flex text-4xl font-bold"><u>SignUp</u></div>


            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col justify-around  h-[200px]">

                    <div className="my-1">
                        <label className="text-lg">Enter Name: </label>
                            <input className="ml-1 w-[65%] border-2 border-black rounded-xl pl-1 py-1 placeholder-slate-500" 
                            type="text" 
                            placeholder="Name"
                            {...register("name")}
                            />
                    </div>
                    
                <p className="text-xs text-red-600 ">{errors.name?.message}</p>


                    <div className="my-1">
                        <label className="text-lg">Enter Username: </label>
                        <input className="w-[59%] border-2 border-black rounded-xl pl-1 py-1 placeholder-slate-500 " 
                        placeholder="Username"
                        {...register("username")}
                        onChange={validateUsername}
                        />
                        
                        <p className="text-xs text-red-600 ">{errors.username?.message}</p>
                    </div>
                    
                    <div className="my-1">
                        <label className="text-lg">Enter Password: </label>
                        <input className="ml-1 w-[60%] border-2 border-black rounded-xl pl-1 py-1 placeholder-slate-500" 
                        type="password" 
                        placeholder="Password"
                        {...register("password")}
                        onChange={(e)=>{
                            if(e.target.value.length < 8){
                                setError("password",{message:"Password should contain 8 characters"});
                                setIsCorrect(false);
                            }
                            else{
                                clearErrors("password");
                                setIsCorrect(true);
                            }
                        }}
                        />
                        
                        <p className="text-xs text-red-600 ">{errors.password?.message}</p>
                        
                    </div>

                    <div className="my-1">
                    <label className="text-lg">Enter Email: </label>
                        <input className="ml-1 w-[65%] border-2 border-black rounded-xl pl-1 py-1 placeholder-slate-500" 
                        placeholder="id@gmail.com"
                        {...register("email")}

                        onChange={validateEmail}
                        />
                    </div>

                    <p className="text-xs text-red-600 ">{errors.email?.message}</p>

                    <div className="mt-1">
                    <label className="text-lg">Enter Age: </label>
                        <span>
                            <input className="ml-1 w-[20%] border-2 border-black rounded-xl pl-1 py-1 placeholder-slate-500" 
                            type="Number"
                            placeholder="Age"
                            {...register("age")}
                            onChange={(e)=>{
                                if(parseInt(e.target.value)<0){
                                    setError("age",{message:"age can't be negative"});
                                    setIsCorrect(false);
                                }
                                else{
                                    clearErrors("age");
                                    setIsCorrect(true);
                                }
                            }}
                            />
                        </span>
                    </div>

                    <p className="text-xs text-red-600 ">{errors.age?.message}</p>

                    

                    <div className="flex justify-center mt-4">
                        <Button text="SignUp" type="submit" sizeButton="lg" className = "px-4 py-4 text-lg" disabled = {!isCorrectValue}
                        varient={(!isCorrectValue||isSubmitting)?"disabled":"default"} isLoading={isSubmitting}/>
                    </div>
                    
                    
                </div>
            </form>

            <div className="flex justify-center mr-3 h-[1rem] w-full pt-10">
                        <p className="text-sm">
                        Already have an account?? <a href="#" className="text-purple-600">SignIn</a>
                        </p>
            </div>
            
        </div>
        
        
    </div>

</div>

    
}