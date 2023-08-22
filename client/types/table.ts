import { states } from "../utils/arrays";
export interface FormInterface{

    name: string,
    email: string,
    contactnumber:string,
    state: typeof states[number];
    city: string,

}

export interface DbFormInterface extends FormInterface{
    id: number,
   

}