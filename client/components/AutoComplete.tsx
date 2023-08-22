import  { ReactElement } from 'react';


interface AutoCompleteProps {
    id: string;
 

    label: string;
   
  
    InputElement:ReactElement

}


export default function AutoComplete({  label,id,InputElement }: AutoCompleteProps) {
  

   
    



    return (
        <div className=" flex my-7 w-full justify-around  sm:py-1">
            <div className='w-[30%]  text-white'>{label}</div>

            <div className='w-[50%] bg-[#333333] text-white rounded-full '    >

                {InputElement}


                <div id={id} className='text-red-500 hidden'>Not Valid !</div>

            </div>
        </div>
    );
}
