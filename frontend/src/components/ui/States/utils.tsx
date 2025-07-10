import { ReactElement } from "react";

export type ButtonVarient = "primary"|"secondary"|"default"|"disabled";



export interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{     
    startIcon?:ReactElement;
    varient?:ButtonVarient;
    endIcon?:ReactElement;
    text?:string;
    onClick?:()=>void;
    sizeButton?:"sm"|"lg"|"md";
    className?:string;
    isLoading?:boolean;
}


export type ButtonTypes = Record<ButtonVarient,string>; 


export const ButtonVarientUse:ButtonTypes = {
    "default":"bg-purple-600  text-[#FAFEFF]",
    "primary":"bg-purple-600 text-[#FAFEFF] ",
    "secondary":"bg-purple-300 text-[#5751BD]",
    "disabled":"bg-purple-400  text-[#FAFEFF]"
    
}


export type ContentPostVarient = "normal"|"important";

export type typeLinkType = "youtube"|"twitter"|"instagram"|"normalPost"|"link";

export interface TagsType {
    _id?:string;
    text?:string;
    OnClick?:()=>void;
    title?:string;
    _v?:number;
}


export interface ContentPostType{
    _id?:string;
    typeLink?:typeLinkType;
    text?:string;
    link?:string;
    title?:string;
    heading?:string;
    textAbout?:string;
    tags?:Array<String>;
    varient?:ContentPostVarient;
    CreatedAt?:Date;
}


export type ContentPostVarientType = Record<ContentPostVarient,string>;

export const ContentPostVarientUse:ContentPostVarientType = {
    "normal":"",
    "important":"bg-[#ecf3fc9a]"
} 