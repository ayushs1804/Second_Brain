import { useForm } from "react-hook-form"
import ContentPost  from "./ContentPost"
import ContentPostSocialMedia  from "./ContentPostSocialMedia";
import { InputPostBoxForm } from "./InputPostBoxForm";
import { useRecoilState, useSetRecoilState } from "recoil";
import { samplePost, viewInputBox } from "./States/RecoilAtoms";

export const InputPostBox = ()=>{
    const setViewInputBoxVal = useSetRecoilState(viewInputBox);
    const [samplePostState,setSamplePostState] = useRecoilState(samplePost);
    
    const {
        register,
        getValues,
        handleSubmit,
        formState:{errors,isLoading,isSubmitting}
    } = useForm();


    return (
        <div className="relative h-screen w-screen border-2 bg-slate-200 bg-opacity-60 z-[99999] flex justify-center items-center">
            <div className="flex justify-around items-center border-2 border-solid border-black h-[90%] w-[80%] rounded-lg opacity-100
            bg-white relative  
            ">
                <div className="absolute top-0 h-fit flex justify-center items-center text-2xl font-bold"><u>Add Post</u></div>
                <div className="absolute top-2 right-2 h-[1em] flex justify-center items-center">
                    <button className="hover:font-bold" onClick={()=>setViewInputBoxVal(c=>!c)}
                    >X</button>
                </div>
                
                <div className="flex justify-center items-center border-2 border-black h-[90%] w-[40%] rounded-lg mt-3 ">
                    <div className="h-[90%] w-[95%]">
                        <InputPostBoxForm/>
                    </div>
                </div>
                <div className="h-[90%] flex items-center">
                    <ContentPostSocialMedia 
                    heading={samplePostState.heading} 
                    link={samplePostState.link}
                    text={samplePostState.text}
                    tags={samplePostState.tags}
                    title={samplePostState.title}
                    textAbout={samplePostState.textAbout}
                    typeLink={samplePostState.typeLink}
                    varient={samplePostState.varient}
                    />
                </div>
            </div>
        </div>
    )
}