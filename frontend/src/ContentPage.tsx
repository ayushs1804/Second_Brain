import { useEffect } from "react"
import  ContentViewer from "./components/ui/ContentViewer"
import OneTapLogin from "./components/ui/OneTapLogin"
import { AddIcon } from "./components/ui/Icons/AddIcon"
import { ShareIcon } from "./components/ui/Icons/ShareIcon"
import { NavBar } from "./components/ui/NavBar"
import { SideBar } from "./components/ui/SideBar"
import { useNavigate } from "react-router-dom"
import { InputPostBox } from "./components/ui/InputPostBox"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { isLoggedIn, LoggedInCheck, viewInputBox } from "./components/ui/States/RecoilAtoms"
import { useSetRecoilState } from "recoil"
import { Loader } from "./components/ui/Loader"
import { Link } from "react-router-dom"

const ContentPage = ()=>{
    const viewInputBoxVal = useRecoilValue(viewInputBox);
    const setViewInputBoxVal = useSetRecoilState(viewInputBox);
    const isLoggedInVal = useRecoilValueLoadable(LoggedInCheck);
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        document.title = "Dashboard"
    },[])
    return <>
          <div className='w-[150px]'>
              <SideBar/>
            </div>
            
        {isLoggedInVal.state === "loading"?<>
          <div>
            {/* @ts-ignore */}
            <Loader height="50" width="50" radius="5" colors={["#5046E2","#5046E2","#5046E2","#5046E2","#5046E2"]}/>
          </div>
          
        </>:<>
        {isLoggedInVal.state === "hasValue" && isLoggedInVal.contents === true?<>
          <div className='absolute w-[100%]'>
                  <NavBar 
                  textButton1="Add Content" 
                  textButton2="Share" 
                  startIcon1={<AddIcon/>} 
                  startIcon2={<ShareIcon/>}
                  onClickButton1={()=>{setViewInputBoxVal(c=>!c)}}
                  onClickButton2={()=>{}}
                  />
          </div>
          <div className='bg-[#F9FBFC]'>
          <div className='absolute flex'>
            
            
            <div className='mt-[70px] ml-[90px]'>
              <ContentViewer/>
            </div>
          </div>
          {viewInputBoxVal && <InputPostBox/>}
        </div>
        </>:<>
        <div className='absolute w-[100%]'>
                  <NavBar 
                  textButton1="SignUp" 
                  textButton2="SignIn" 
                  onClickButton1={()=>{navigate("/signup")}}
                  onClickButton2={()=>{navigate("/signin")}}
                  />
          </div>
          <div className="h-screen w-screen flex justify-center items-center">
            <OneTapLogin/>
            <div>
              <div className="flex">
                  Unknown Error Occured
              </div>
              <div className="flex">
                Try <Link to ="/signin" className="text-purple-600">&nbsp;Signinig In&nbsp; </Link>
                Or <Link to ="/signup" className="text-purple-600">&nbsp;Signup&nbsp;</Link>
              </div>
            </div>
          </div>
        </>}
        </>}

    </>
}


export default ContentPage;