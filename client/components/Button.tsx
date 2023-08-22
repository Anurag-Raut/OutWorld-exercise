import * as React from 'react';


interface ButtonProps{
    label:string;
    onClick:()=>void;

}



export default function Button({label,onClick}:ButtonProps){

    return(
        <div>
            <button onClick={onClick} className="bg-transparent hover:bg-blue-600 border border-2 border-blue-600 rounded-full hover:bg-blue-600 active:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 active:scale-95 text-lg   ">
                {label}
            </button>
        </div>

    )

}