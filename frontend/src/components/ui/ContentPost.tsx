import { DeleteIcon } from "./Icons/DeleteIcon";
import { ListIcon } from "./Icons/ListIcon";
import { ShareIconGrey } from "./Icons/ShareIcon";
import { ContentPostType, ContentPostVarient, ContentPostVarientUse } from "./States/utils";
import { Tags } from "./Tags";




const DefaultStyles:String = " flex-wrap rounded-md border-solid border my-4 mx-[30px] px-[15px] py-[15px] h-[420px]  w-[400px] justify-center item-center shadow-md";

const ContentPost = (props:ContentPostType)=>{
    return (
        <div className={`${DefaultStyles} ${ContentPostVarientUse[props.varient?props.varient:"normal"]}`}>
            <div className="pb-3">
                <div className="flex justify-between items-center h-[1em]">
                    <div className="flex items-center"><ListIcon/> <span className="font-medium">Project Idea</span></div>
                    <div className="flex items-center w-[50%] justify-end"><ShareIconGrey/> <DeleteIcon/></div>
                </div>
            </div>
            
            <div className="h-[2em] my-3">
                <div className="font-bold text-2xl">Future Projects</div>
            </div>
            <div className="h-[200px] overflow-auto">
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex do
                    lor possimus officia enim dolorum facilis deleniti, exp
                    licabo, eos a
                </div>    
            </div>
            <div className="my-2 flex flex-wrap">
                <Tags text={"productivity"}/>
                <Tags text={"ideas"}/>
                <Tags text={"productivity"}/>
                <Tags text={"productivity"}/>
            </div>

            <div className="text-[#8B8C91] text-sm ml-1">
                Added on 23/11/2021
            </div>
            
        </div>
    )
    
}

export default ContentPost;