import * as React from 'react';
interface InputProps {
    value:string;
    placeholder?:string;
    type:string;
    label:string;
    onChange: (newValue: any) => void;

}

export default function Input({value, onChange,placeholder,type,label}:InputProps) {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
      };


  return (
      <div>
        <label htmlFor="">{label}</label>
        <input id='input' value={value} onChange={handleChange} type={type} placeholder={placeholder} />
      </div>

  )
}
