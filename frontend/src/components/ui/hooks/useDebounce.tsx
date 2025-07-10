import { useEffect, useRef } from "react"

export const useFetchDebounce = (url:string)=>{
    const returnData = useRef<JSON>();
    useEffect(()=>{
        setTimeout(async ()=>{
            const reqFunc = async ()=>{
                const data = await fetch(url);
                returnData.current = data?data:JSON.parse(JSON.stringify({"message":"Error"}));
            }
            await reqFunc();
        },500);
    },[url]);


    return returnData;
}