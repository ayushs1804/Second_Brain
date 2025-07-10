import { Component, ReactElement } from "react";
import { Loader } from "./Loader";

type ButtonVarient = "primary"|"secondary"|"default"|"disabled";



interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{     
    startIcon?:ReactElement;
    varient?:ButtonVarient;
    endIcon?:ReactElement;
    text?:string;
    onClick?:()=>void;
    sizeButton?:"sm"|"lg"|"md";
    className?:string;
    isLoading?:boolean;
}


type ButtonTypes = Record<ButtonVarient,string>; 


const ButtonVarientUse:ButtonTypes = {
    "default":"bg-purple-600  text-[#FAFEFF]",
    "primary":"bg-purple-600 text-[#FAFEFF] ",
    "secondary":"bg-purple-300 text-[#5751BD]",
    "disabled":"bg-purple-400  text-[#FAFEFF]"
    
}
const DefaultStyles:string = "rounded-md px-[10px] py-[7px] flex items-center mx-2 ";


const Button = (props:ButtonProps)=>{
    return(
        <>
            {/* @ts-ignore */}
            <button 
            className= {
                `
                ${DefaultStyles} 
                ${ButtonVarientUse[props.varient?props.varient:"default"]}
                size = ${props.sizeButton?props.sizeButton:"md"}
                ${props.className}
            `} 
            disabled = {props.disabled?props.disabled:false}
            onClick={props.onClick?props.onClick:()=>{}}
            >
                {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
                {props.isLoading?<Loader/>:props.text}
                {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
            </button>
      
        </>
    )
}


export default Button;