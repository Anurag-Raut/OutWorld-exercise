import * as React from 'react';
interface InputProps {
  id: string;
  value: string;
  placeholder?: string;
  type: string;
  label: string;
  onChange: (newValue: any) => void;

}

export default function Input({ value, onChange, placeholder, type, label, id }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };


  return (
    <div className='flex my-7 w-full justify-around '>
          <div className='w-[30%] text-white'>{label}</div>
          <div  className='w-[50%] ' >
            <input id='input' value={value} onChange={handleChange} type={type} placeholder={placeholder} className="bg-[#333333] max-w-full min-w-[50%] text-white text-sm rounded-full   block w-full p-4 placeholder-gray-500 " required />
            <div id={id} className='text-red-500 hidden'>Incorrect Format !</div>
          </div>
    </div>

  )
}
