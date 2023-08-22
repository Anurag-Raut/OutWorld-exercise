import {states} from '../utils/arrays'
import {DbFormInterface, FormInterface} from '../types/table'
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const numberRegex = /^[0-9]+$/;



export function Validation(inputData:FormInterface|DbFormInterface,emailError:HTMLElement|null,contactError:HTMLElement|null,stateError:HTMLElement|null){
    let error=false;

    if (!emailRegex.test(inputData.email)) {
      if(emailError){
        emailError!.style!.display='block'
      }   
      error=true;  
    }
    if (!numberRegex.test(inputData.contactnumber) || (inputData.contactnumber.length!==10) ) {
      if(contactError){
        contactError!.style!.display='block'
      }
     error=true;
    }

    if(!states.includes(inputData.state)){
      if(stateError){
        stateError!.style!.display='block'
      }
     error=true;
    }


        if(!error){
            contactError!.style!.display='none'
    emailError!.style!.display='none'
    stateError!.style!.display='none'
        }





    return error;


}