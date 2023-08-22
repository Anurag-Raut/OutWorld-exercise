
import * as React from 'react';
interface InputProps {
    value:string;
    placeholder?:string;
    type:string;
    
    onChange: (newValue: any) => void;

}

export default function TableInput({value, onChange,placeholder,type}:InputProps) {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
      };
    return(
       
      
            <div className="relative z-0">
                <input value={value} onChange={handleChange}  type={type} id="floating_standard" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none  focus:border-blue-600 peer" placeholder={placeholder} />
            </div>
   
    )
}