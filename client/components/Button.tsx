import * as React from 'react';


interface ButtonProps{
    label:string;
    onClick:()=>void;

}



export default function Button({label,onClick}:ButtonProps){

    return(
        <div>
            <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {label}
            </button>
        </div>

    )

}