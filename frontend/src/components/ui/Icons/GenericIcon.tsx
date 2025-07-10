import { ReactElement } from "react"

interface IconType{
    icon:ReactElement
}


export const GenericIcon = (props:IconType)=>{
    return <div>
        {props.icon}
    </div>
}