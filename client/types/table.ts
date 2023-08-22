export interface FormInterface{

    name: string,
    email: string,
    contactNumber:string,
    state: string,
    city: string,

}

export interface DbFormInterface extends FormInterface{
    id: number,
   

}