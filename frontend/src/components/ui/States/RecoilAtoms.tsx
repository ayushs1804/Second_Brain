import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { ContentPostType, ContentPostVarientUse } from "./utils";



export const loadingAtom = atom({
    key:"loadingAtom",
    default:true
})

export const isCorrect = atom({
    key:"isCorrect",
    default:true
})
export const triggerLoggedInCheck = atom({
    key:"triggerLoggedInCheck",
    default:0
})

export const LoggedInCheck = selector({
    key:"LoggedInCheck",
    get:async ({get})=>{
        get(triggerLoggedInCheck);
        return await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signin",{
            method:"GET",
            credentials:"include"
        }).then((res)=>res.json()).then((res)=>{
            console.log(res.value)
            return res.value});
    }
})

export const isLoggedIn = atom({
    key:"isLoggedIn",
    default:selector({
        key:"isLoggedInSelector",
        get:async ({get})=>{
            return await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/signin",{
                method:"GET",
                credentials:"include"
            }).then((res)=>res.json()).then((res)=>{
                console.log(res.value)
                return res.value});
        }
    })
})

export const viewInputBox = atom({
    key:"viewInputBox",
    default:false
})
export const postsTrigger = atom({
    key:"postsTrigger",
    default:0
})
export const postsArray = selector({
    key:"postsArray",
    get:async ({get})=>{
        get(postsTrigger);
        const data = await fetch("https://second-brain-backend-abk0.onrender.com/api/v1/content",{
            method:"GET",
            credentials:"include"
        }).then(res=>res.json()).then(res=>res)
        return data.posts;
    }
    })

export const posts = atomFamily({
    key:"posts",
    default: id => selectorFamily({
        key:"postsSelectorFamily",
        get: id=> async ({get})=>{
            const posts = await get(postsArray);

            posts.filter((x:ContentPostType)=>x._id === id)

        }
    })
})

export const samplePost = atom<ContentPostType>({
    key:"samplePost",
    default:{
        typeLink:"normalPost",
        text:"",
        link:"",
        title:"",
        heading:"",
        textAbout:"",
        varient:"normal",
        tags:[]
    }
})

export const samplePostTags = selector({
    key:"samplePostTags",
    get:({get})=>{
        const data = get(samplePost);
        return data.tags;
    }
})