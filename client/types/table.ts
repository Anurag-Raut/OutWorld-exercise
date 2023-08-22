export interface FormInterface{

    name: string,
    email: string,
    contactnumber:string,
    state: string,
    city: string,

}

export interface DbFormInterface extends FormInterface{
    id: number,
   

}