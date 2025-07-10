import { InstagramEmbed, TwitterEmbed, YouTubeEmbed } from "react-social-media-embed";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { ShareIconGrey } from "./Icons/ShareIcon";
import { YoutubeIcon } from "./Icons/YoutubeIcon";
import { Tags } from "./Tags";
import { ContentPostType, ContentPostVarientUse } from "./States/utils";
import { Loader } from "./Loader";




const DefaultStyles:String = "flex-wrap my-4 h-fit rounded-md border-solid border mx-[30px] px-[15px] py-[15px] w-[400px] justify-center item-center shadow-md";

const ContentPostSocialMedia = (props:ContentPostType)=>{
    
        return (
            <div className={`${DefaultStyles} ${ContentPostVarientUse[props.varient?props.varient:"normal"]}`}>

                {/* topBar for Share and Delete */}
                <div className="pb-3 pt-2">
                    <div className="flex justify-between items-center h-[1em]">
                        <div className="flex items-center"><YoutubeIcon/> <span className="font-medium">{props.title?props.title:"Second Brain"}</span></div>
                        <div className="flex items-center w-[50%] justify-end"><ShareIconGrey/> <DeleteIcon/></div>
                    </div>
                </div>


                {/* heading */}
                <div className="h-[2em] my-3">
                    <div className="font-bold text-2xl">{props.heading?props.heading:<>How to Build a Second Brain</>}</div>
                </div>

                {/* link embedding */}
                {/* {!props.link &&<div className="max-h-[450px]  h-[200px] w-[370px] border-2 border-black rounded-lg  py-4 flex-wrap overflow-y-auto overflow-x-hidden
                flex justify-center items-center">

                    Enter a link to view embedded post
                </div> } */}
                {props.typeLink!= "normalPost" ? <div className="max-h-[400px]  h-fit py-4 flex-wrap overflow-y-auto overflow-x-hidden">
                    {props.typeLink == "instagram" && <InstagramEmbed url={props.link?props.link:"https://www.instagram.com/shitindianssay/reel/DDMnUaANvxs/"} captioned/>}
                    {props.typeLink == "twitter" &&<>{props.link?<iframe width={370} height={280}
 src={`https://twitframe.com/show?url=${encodeURIComponent(props.link).replace("x.com","twitter.com")}`}></iframe>:<iframe width={370} height={280}
 src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fjack%2Fstatus%2F20"></iframe>}
                    </>}
                    {props.typeLink == "youtube" && <iframe width={"370"} height="200" src={props.link?props.link:"https://www.youtube.com/embed/UrW19xffEUk?si=JPAu5OgGTlB1eeua"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen = {true}
                    ></iframe>}
                    {props.typeLink == "link" && <a href= {props.link}>{props.link}</a>}
                </div>:<></>}

                {/* textAbout */}
                <div className="h-[87px] overflow-auto flex-wrap">
                    {props.textAbout?props.textAbout:<>Enter Text About</>}
                </div>

                {/* Tags */}
                <div className="my-1 flex flex-wrap">
                    {props.tags?<>{
                        //@ts-ignore
                        props.tags.map((x,i)=><Tags key={i} text = {x.text?x.text:x.title?x.title:x?x:undefined}/>)
                    }</>:<Tags text={"Enter Text"}/>}

                    {/* <Tags text={"productivity"}/>
                    <Tags text={"ideas"}/>
                    <Tags text={"productivity"}/>
                    <Tags text={"productivity"}/> */}

                </div>
                

                {/* Date of Adding */}
                <div className="text-[#8B8C91] text-sm ml-1">
                    {props.CreatedAt?<>{props.CreatedAt}</>:<>Date of Adding Post Appears Here</>}
                </div>
                
            </div>
    )
}

export default ContentPostSocialMedia;