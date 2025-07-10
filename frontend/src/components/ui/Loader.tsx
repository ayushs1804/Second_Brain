import { ColorRing } from 'react-loader-spinner';
interface LoaderProps{
  height?:string;
  width?:string;
  radius?:string;
  colors?:[string];
}
//@ts-ignore
export const Loader = (props:LoaderProps)=>{
    return <ColorRing
    height={props.height?props.height:"20"}
    width={props.width?props.width:"60"}
    //@ts-ignore
    radius={props.radius?props.radius:"9"}
    color="purple"
    ariaLabel="loading"
    //@ts-ignore
    colors={props.colors?props.colors:["#fffff"]}
  />
}