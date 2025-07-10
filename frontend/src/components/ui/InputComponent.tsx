interface InputComponentType{
    placeholder?:string;
    onChange?:()=>void;
    type?:string;
    labelText?:string,
    HtmlFor?:string
}

export const InputComponent = (props:InputComponentType)=>{
    return <div className="flex">
        <div className="mx-3">
             <label htmlFor={props.HtmlFor?props.HtmlFor:"random"}>{props.labelText}</label>
        </div>

        <div>
            <input placeholder= {props.placeholder?props.placeholder:""}
            onChange={props.onChange?props.onChange:(e)=>{}}
            type = {props.type?props.type:"text"}
            name={props.HtmlFor?props.HtmlFor:"random"}
            className="border border-solid border-black pl-1"/>
        </div>

        

    </div>
}