import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil"
import ContentPost  from "./ContentPost"
import ContentPostSocialMedia  from "./ContentPostSocialMedia"
import { InputPostBox } from "./InputPostBox"
import { isLoggedIn, postsArray } from "./States/RecoilAtoms"
import { Loader } from "./Loader"
import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { ContentPostType } from "./States/utils"
import { useEffect, useState } from "react"

const ContentViewer = ()=>{
    const postsArrayVal = useRecoilValueLoadable<Array<ContentPostType>>(postsArray);
    console.log(postsArrayVal.contents);

    return (
        <div>
            <div>
                <div className="my-4 mx-6 ml-8 font-bold text-xl">
                    All Notes
                </div>
                <div className="flex flex-wrap">
                    {
                    postsArrayVal.state === "hasValue"?
                    <>
                    {/* {console.log(postsArrayVal.contents)} */}
                    {postsArrayVal.contents.map(({_id,title,CreatedAt,heading,link,tags,text,textAbout,typeLink,varient}) => (
                <ContentPostSocialMedia 
                key={_id}
                title = {title}
                CreatedAt={CreatedAt}
                _id={_id}
                heading={heading}
                link={link}
                tags={tags}
                textAbout={textAbout}
                typeLink={typeLink}
                varient={varient}
                />
        ))
        }
        
                    {/* {postsArrayVal.contents.map((value,index)=>(
                            <div key={index}>
                                <ContentPostSocialMedia 
                                
                                id={value.id}
                                CreatedAt={value.CreatedAt}
                                heading={value.heading}
                                link={value.link}
                                tags={value.tags}
                                textAbout={value.textAbout}
                                title={value.title}
                                typeLink={value.typeLink}
                                varient={value.varient}
                                />
                            </div>
                        )
                        )
                        } */}
                    </>
                    :
                    <><Loader/></>

                    }
                </div>
            </div>
            
        </div>
        
        
    )
}

export default ContentViewer;

{/* <div className=""><ContentPost varient = "important"/></div>
                    <div className=""><ContentPostSocialMedia typeLink="youtube"/></div>
                    <div className=""><ContentPost/></div>
                    <div className=""><ContentPost/></div>
                    <div className=""><ContentPost/></div>
                    <div className=""><ContentPost/></div>   
                    <div className=""><ContentPost/></div>   
                    <div className=""><ContentPost/></div>   
                    <div className=""><ContentPost/></div>   
                    <div className=""><ContentPost/></div>   
                    <div className=""><ContentPostSocialMedia typeLink="twitter"/></div>
                    <div className=""><ContentPostSocialMedia typeLink="instagram"/></div>   
                    <div className=""><ContentPost/></div> 
                    <div className=""><ContentPost/></div> 
                    <div className=""><ContentPost/></div> 
                    <div><ContentPostSocialMedia 
                    title="Insta post"
                    heading="This is Important"
                    link="https://www.youtube.com/embed/YZZOCyeWdY0"
                    textAbout="Some random Text"
                    typeLink="youtube"
                    tags={["Productivity","Link"]}
                    varient="important"
                    /></div> */}