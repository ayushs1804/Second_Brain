import { useForm, useWatch } from "react-hook-form"
import { ContentPostType } from "./States/utils";
import Button from "./Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postsTrigger, samplePost, samplePostTags, viewInputBox } from "./States/RecoilAtoms";
import { useState } from "react";
import { Tags } from "./Tags";



export const InputPostBoxForm = ()=>{
    const setSamplePost = useSetRecoilState(samplePost);
    const setviewInputBox = useSetRecoilState(viewInputBox);
    const samplePostVal = useRecoilValue(samplePost);
    const [tagString,setTagString] = useState("");
    const samplePostTagsVal = useRecoilValue(samplePostTags);
    const setPostsArray = useSetRecoilState(postsTrigger);
    
    function convertToEmbedUrl(url: string): string {
        const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return `https://www.youtube.com/embed/${match[1]}`;
        }
        return "Invalid URL"
      }

    const onSubmit = async (data:ContentPostType)=>{
     
        setSamplePost(val=>({...val,tags:samplePostTagsVal}));
        console.log(samplePostTagsVal);
        console.log(samplePostVal);
        const res = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/content",{
            method:"POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json', // Specify the data format
            },
            body:JSON.stringify({
                typeLink:data.typeLink?data.typeLink:"undefined",
                text:data.text?data.text:"undefined",
                link: data.link?
                data.typeLink === "youtube"?convertToEmbedUrl(data.link):
                data.link:"undefined",
                title: data.title?data.title:"undefined",
                heading:data.heading?data.heading:"undefined",
                textAbout:data.textAbout?data.textAbout:"undefined",
                varient:"normal",
                tags: samplePostTagsVal
            })
        }).then(res=>res.json())
        console.log(res);
        if(res.value === true){
            setSamplePost({
                heading:"",
                link:"",
                tags:[],
                text:"",
                title:"",
                textAbout:"",
                typeLink:"normalPost",
                varient:"normal",
            })
            setviewInputBox(false);
            setPostsArray(e=>e+1);
        }
        
    }

    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        getValues,
        getFieldState,
        watch

    } = useForm<ContentPostType>();

    const DefaultInputStyle = "pl-2 h-[2rem] w-[100%] border-2 border-black rounded-xl focus:bg-purple-300 placeholder-purple-600 placeholder-opacity-50";
    const DefaultContainerStyle = "grid grid-cols-4 col-span-4 flex justify-center items-center";
   return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-y-3">
            <div className={DefaultContainerStyle}>
                <div className="">
                    <label>Enter Title: </label>
                </div>
                <div className="col-span-3">
                    <input 
                    className={DefaultInputStyle}
                    // className=""
                    placeholder="Second Brain" 
                    {...register("title")}
                    onChange={e=>setSamplePost(val=>({...val ,title:e.target.value}))}
                    />
                </div>
            </div>

            <div className={DefaultContainerStyle}>
                <div className="">
                    <label>Enter Heading: </label>
                </div>
                <div className="col-span-3">
                    <input className={DefaultInputStyle}
                    placeholder="How to Build a Second Brain"
                    {...register("heading")}
                    onChange={e=>setSamplePost(val=>({...val ,heading:e.target.value}))}
                    />
                </div>
            </div>

            <div className="col-span-3">Select your post type: </div>
            <div className="col-span-4 flex justify-around">
                
                <div>
                    <input type="radio" {...register("typeLink")} value={"link"} id = "link"
                    onClick={(e)=>{setSamplePost(val=>({...val,typeLink:"link"}))}}
                    /><label htmlFor="link" >Link</label>
                </div>
                
                <div>
                    <input type="radio" {...register("typeLink")} value={"youtube"} id ="youtube"/><label htmlFor="youtube"
                    onClick={(e)=>{setSamplePost(val=>({...val,typeLink:"youtube"}))}}

                    >Youtube</label>
                </div>
                <div>
                    <input type="radio" {...register("typeLink")} value={"twitter"} id="twitter"
                    onClick={(e)=>{setSamplePost(val=>({...val,typeLink:"twitter"}))}}

                    /><label htmlFor="twitter">Twitter</label>
                </div>

                <div>
                    <input type="radio" {...register("typeLink")} value={"instagram"} id="instagram"
                    onClick={(e)=>{setSamplePost(val=>({...val,typeLink:"instagram"}))}}

                    /><label htmlFor="instagram">Instagram</label>
                </div>

                <div>
                    <input type="radio" {...register("typeLink")} value={"normalPost"} id = "normalPost"
                    onClick={(e)=>{setSamplePost(val=>({...val,typeLink:"normalPost"}))}}
                    
                    /><label htmlFor="normalPost" >Normal Post</label>
                </div>
            </div>


            {
            watch("typeLink") === "link" ?<>
            <div className={DefaultContainerStyle}>
                <div className="">
                    <label>Enter Link: </label>
                </div>
                <div className="col-span-3">
                    <input className={DefaultInputStyle}
                    placeholder="How to Build a Second Brain"
                    type="url"
                    {...register("link")}
                    onChange={e=>setSamplePost(val=>({...val,link:e.target.value}))}
                    />
                </div>
            </div>
            </> 
            :
            watch("typeLink") === "instagram" ?<>
            <div className="">
                <label>Enter Insta Post Url: </label>
            </div>
            <div className="col-span-3">
                <input className={DefaultInputStyle}
                placeholder="https://www.instagram.com/shitindianssay/reel/DDMnUaANvxs/"
                type="url"
                {...register("link")}
                onChange={e=>setSamplePost(val=>({...val,link:e.target.value}))}
                />
            </div>
            </> 
            :
                watch("typeLink") == "youtube" ?<>
                <div className="">
                    <label>Enter Youtube link: </label>
                </div>
                <div className="col-span-3">
                    <input className={DefaultInputStyle}
                    placeholder="https://www.youtube.com/embed/UrW19xffEUk?si=JPAu5OgGTlB1eeua"
                    type="url"
                    {...register("link")}
                    onChange={e=>setSamplePost(val=>({...val,link:convertToEmbedUrl(e.target.value)}))}
                    />
                </div>

            </>
            :
            watch("typeLink") === "twitter" ?<>
            <div className="">
            <label>Enter Twitter Post Url: </label>
            </div>
            <div className="col-span-3">
                <input className={DefaultInputStyle}
                placeholder="https://x.com/maybe_riya/status/1864673389497209264"
                type="url"
                {...register("link")}
                
                onChange={e=>setSamplePost(val=>({...val,link:e.target.value}))}
                />
            </div>
            </>
            :<></>
            }

            

            <div className="col-span-4">
                <label>Enter Description: </label>
            </div>
            <div className="col-span-4">
                <textarea 
                className="border-2 border-black w-full h-[70px] rounded-lg p-1 focus:bg-purple-300 placeholder-purple-600 placeholder-opacity-50"
                placeholder="Enter Some Description"
                {...register("textAbout")}
                onChange={e=>setSamplePost(val=>({...val,textAbout:e.target.value}))}
                />
            </div>

            
            <div className="grid grid-cols-4 col-span-4 items-center">
                <div className="">
                    <label>Add Tags </label>
                </div>
                <div className="col-span-2">
                    <input className={DefaultInputStyle}
                    placeholder="productive"
                    id="TagInput"
                    onChange={(e)=>setTagString(val=>e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button 
                    className="bg-purple-300 px-5 py-1 rounded-lg border-1 border-solid border-black text-purple-600"
                    type="button"
                    onClick={(e)=>{
                        if(tagString != ""){
                            //@ts-ignore
                            setSamplePost(val=>({...val,tags:[...val.tags,tagString]}))
                        }


                    }}
                    >Add</button>
                </div>
                {/* <div className=""> */}
                        <div className="flex col-span-4 mt-3 w-[full] h-[100px] border-2 rounded-md flex-wrap">
                            {samplePostTagsVal?.map((val,index) =>(
                                //@ts-ignore
                                <Tags key={index} text={val} OnClick={()=>{setSamplePost(val=>({
                                    ...val,
                                    tags:val.tags?.filter((value,i)=>i !== index)
                                }))}}/>
                            ))
                        }
                        </div>
                {/* </div> */}
                <div className="col-span-4 mt-3 flex justify-center items-center">
                        <Button text="Add Post "type="submit" isLoading ={isSubmitting} disabled={isSubmitting}/>
                </div>
                
            </div>
            
            
            

        </div>
    </form>
   )
}