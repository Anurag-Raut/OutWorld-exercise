

import { DbFormInterface } from '../types/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { socket } from '../src/socket'
import TableInput from './tableInput';
import { Validation } from '../utils/validation';
import SearchSelect from './searchSelect';
import { states } from '../utils/arrays';
// import dotenv from 'dotenv'

// dotenv.config();


export default function Table({ Data, setData }: { Data: DbFormInterface[], setData: any }) {

    console.log(Data)
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editFormData, setEditFormData] = useState<DbFormInterface >(
        {
            id: -1,
            name: '',
            email: '',
            contactnumber: '',
            state: '',
            city: '',

        }
    );


    async function DeleteData(id: number) {
        await axios.post(`${'https://outworld-exercise1-backend.onrender.com'}/deleteTableData`, { id: id })
    
    
    }

    async function updateData(data: DbFormInterface) {
        if(Validation(data,document.getElementById('table-email'),document.getElementById('table-contact_number'),document.getElementById('table-state'))){
            return;
        }
        
        await axios.post('http://localhost:5000/api/updateTableData', data)

        setEditIndex(-1) 
    }
        
    // }
    console.log(editFormData);

    


  

    useEffect(() => {

         function handleInsert(data: DbFormInterface)  {
        setData((prevData: DbFormInterface[]) => [...prevData, data]);
    };

    function  handleDelete(id: number){
        setData((prevData: DbFormInterface[]) => prevData.filter((item: DbFormInterface) => item.id !== id));
    };

    function handleUpdate (updatedData: DbFormInterface){
        console.log(updatedData, 'update');
        setData((prevData: DbFormInterface[]) => prevData.map((item: DbFormInterface) => item.id === updatedData.id ? updatedData : item));
    };

        socket.on('insert', handleInsert);
        socket.on('delete', handleDelete);
        socket.on('update', handleUpdate);

        return () => {
            socket.off('insert', handleInsert);
            socket.off('delete', handleDelete);
            socket.off('update', handleUpdate);
        };
    }, []);

    return (
        <div className="relative overflow-x-auto rounded-xl h-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 h-full">
                <thead className="text-xs text-gray-300 uppercase bg-[#352F44]   ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            state
                        </th>
                        <th scope="col" className="px-6 py-3">
                            contact Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            city
                        </th>
                        <th scope="col" className="px-6 py-3">
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {Data?.map((item, index) => (
                        <>

                            {

                                editIndex === item.id ?
                                    <tr className=" text-black  bg-[#FAF0E6] h-full" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                                            <TableInput id='table-name' value={editFormData?.name} onChange={(newValue:string)=>{setEditFormData({...editFormData,name:newValue})}} type='text' placeholder='enter name'  />
                                        </th>
                                        <td className="px-6 py-4">
                                            <TableInput id='table-email' value={editFormData?.email} onChange={(newValue:string)=>{setEditFormData({...editFormData,email:newValue})}} type='text' placeholder='enter email'  />
                                        </td>
                                        <td className="px-6 py-4 h-full">
                                            <div className='bg-[#FAF0E6]  '>

                                        <SearchSelect value={editFormData?.state} onChange={(newValue:string)=>{setEditFormData({...editFormData,state:newValue})}} inputClass='block py-2 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none  focus:border-blue-600 peer' options={states}   />
                                        <div id='table-state' className='text-red-500 hidden'>Incorrect Format !</div>
                                            </div>

                                            {/* <TableInput id='table-state' value={editFormData?.state} onChange={(newValue:string)=>{setEditFormData({...editFormData,state:newValue})}} type='text' placeholder='enter state'  /> */}
                                        </td>
                                        <td className="px-6 py-4">
                                            <TableInput id='table-contact_number' value={editFormData?.contactnumber} onChange={(newValue:string)=>{setEditFormData({...editFormData,contactnumber:newValue})}} type='text' placeholder='enter contactNumber'  />
                                        </td>
                                        <td className="px-6 py-4">
                                            <TableInput id='table-city' value={editFormData?.city} onChange={(newValue:string)=>{setEditFormData({...editFormData,city:newValue})}} type='text' placeholder='enter contactNumber'  />
                                        </td>

                                        <td className="px-6 py-4">
                                            <button className='font-bold text-green-500 px-2' onClick={() => { updateData(editFormData)}} >Save</button>
                                            <button className='font-bold text-red-500 px-2' onClick={() => { setEditIndex(-1)}} >Cancel</button>
                                        </td>


                                    </tr>
                                    :


                                    <tr className=" bg-[#5C5470] text-gray-200 " key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap ">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.state}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.contactnumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.city}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button className='font-bold text-yellow-500 px-2 uppercase ' onClick={() => { setEditFormData(item); setEditIndex(item.id) }} >Edit</button>
                                            <button className='font-bold text-red-400 px-2 uppercase ' onClick={() => DeleteData(item.id)} >Delete</button>
                                        </td>


                                    </tr>
                            }


                        </>
                    ))}


                </tbody>
            </table>
        </div>
    );
}
