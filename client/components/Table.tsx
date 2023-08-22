

import { DbFormInterface } from '../types/table';
import axios from 'axios';
import { useEffect } from 'react';
import io from 'socket.io-client';
const socket=io('http://localhost:4000');


async function DeleteData(id: number) {
    await axios.post('http://localhost:5000/api/deleteTableData', { id: id })
    

}

export default function Table({ Data,setData }: { Data: DbFormInterface[],setData:any }) {

    useEffect(() => {
        socket.on('insert', (data: any) => {
            console.log(data);
        });

        socket.on('delete', (id: number) => {
            setData((prevData: DbFormInterface[]) => prevData.filter((item: DbFormInterface) => item.id !== id));
        });

        socket.on('update', (data: any) => {
            console.log(data);
        });

        return () => {
            socket.off('insert');
            socket.off('delete');
            socket.off('update');
        };
    }, []); 

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            contactNumber
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.email}
                            </td>
                            <td className="px-6 py-4">
                                {item.state}
                            </td>
                            <td className="px-6 py-4">
                                {item.contactNumber}
                            </td>
                            <td className="px-6 py-4">
                                {item.city}
                            </td>4

                            <td className="px-6 py-4">
                                <button>Edit</button>
                                <button onClick={() => DeleteData(item.id)} >Delete</button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
