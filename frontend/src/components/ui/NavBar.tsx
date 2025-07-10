import { ReactElement } from "react"
import Button from "./Button"
import { AddIcon } from "./Icons/AddIcon"
import { BrainIcon } from "./Icons/BrainIcon"
import { ListBulletin } from "./Icons/ListBulletin"
import { ShareIcon } from "./Icons/ShareIcon"


// interface ButtonProps{    
//     startIcon?:ReactElement|string;
//     varient?:ButtonVarient;
//     endIcon?:ReactElement;
//     text?:string;
//     onClick?:()=>void;
//     size?:"sm"|"lg"|"md"
// }
interface NavBarType{
    textButton1?:string,
    textButton2?:string,
    onClickButton1?:()=>void,
    onClickButton2?:()=>void,
    startIcon1?:ReactElement,
    startIcon2?:ReactElement

}
export const NavBar = (props:NavBarType)=>{
    return <div className="z-30 opacity-100 bg-[white] h-[4em] border-2 border-b-solid w-screen overflow-hidden fixed top-0">
            <div className="flex ml-2 mt-1 items-center w-[100%] border-solid border-violet-100 justify-between">
                <div className="flex justify-around items-center">
                    <BrainIcon/>
                    <div className="flex text-4xl text-indigo-500 ml-4">Second Brain</div>
                </div>

                <div className="flex mr-5">
                    <Button startIcon={props.startIcon1} text={props.textButton1} onClick= {props.onClickButton1?props.onClickButton1:()=>{}}/>
                    <Button startIcon={props.startIcon2} text={props.textButton2} varient="secondary" onClick= {props.onClickButton2?props.onClickButton2:()=>{}}/>
                </div>
            </div>
            
        
    </div>
}