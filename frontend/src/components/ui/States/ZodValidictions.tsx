import {z} from "zod";



export const SignUpZod = z.object({
    username:z.string().min(1,"username can't be empty").max(40,"username can't be of more than 40 words"),
    password:z.string().min(8,"Password must be atleast 8 characters"),
    name:z.string().min(1,"Name should'nt be empty"),
    email:z.string().email("Email Type Not Validated"),
    age:z.preprocess((a)=>parseInt(z.string().parse(a),10),z.number().min(1,"Must be atleast 1").optional())
}) 

export type SignUpZodType = z.infer<typeof SignUpZod>;
