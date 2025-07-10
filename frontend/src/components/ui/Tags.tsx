import { TagsType } from "./States/utils"


export const Tags = (props:TagsType)=>{
    // console.log(props.text);
    // console.log(props.title);
    return <div className="h-fit w-fit text-sm flex justify-center border-solid border-1 bg-[#ECF3FC]  rounded-full mr-[2px] my-[2px]">
        <div className="px-[8px] py-[2px] text-[#645BCA]">
            {props.OnClick&&<button type="button" onClick={props.OnClick}>X</button>}
            #{props.text?props.text:props.title?props.title:"Enter Text"}
            
        </div>
    </div>
}