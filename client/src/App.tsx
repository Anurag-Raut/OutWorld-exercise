import { useEffect, useState } from 'react'
import Input from '../components/Input'
import AutoComplete from '../components/AutoComplete'
import Button from '../components/Button'
import Table from '../components/Table'
import {FormInterface,DbFormInterface} from '../types/table'
import axios from 'axios'
import {Validation} from '../utils/validation'
import SearchSelect from '../components/searchSelect'

import {states} from '../utils/arrays'
import './App.css'

function App() {
  const initalData={
    name: '',
    email: '',
    contactnumber: '',
    state: '',
    city: '',
  }


  const [FormData, setFormData] =useState<FormInterface>(initalData)

  const [TableData,setTableData]=useState<DbFormInterface[]>([]);
  useEffect(()=>{
    async function fetchData(){
      const res=await axios.post('http://localhost:5000/api/getTableData',{});
      setTableData(res.data);
      console.log(res.data);
   
    }

  fetchData();
  },[]);

  


  async function insertIntoTable(inputData:FormInterface){


    if(Validation(inputData,document.getElementById('name'),document.getElementById('email'),document.getElementById('statee'))){
      return;
    }


    

    try{
      await axios.post('http://localhost:5000/api/postTableData',inputData);
      setFormData(initalData)
    }
    catch(err){
      console.log(err);
    }




    

  }

  console.log(FormData)

  return (
    <>
      <div className='mb-10'  >

        <Input id='name' placeholder='Enter Name' label={'Enter name'} type='text' value={FormData.name} onChange={(newValue)=>{setFormData({...FormData,name:newValue})}}  />
        <Input id='email' placeholder='Enter Email' label={'Enter email'} type='text' value={FormData.email} onChange={(newValue)=>{setFormData({...FormData,email:newValue})}}  />
        <Input id='contact_number' placeholder='Enter Contact number' label={'Enter contact number'} type='text' value={FormData.contactnumber} onChange={(newValue)=>{setFormData({...FormData,contactnumber:newValue})}}  />
        <AutoComplete id='statee' label={'Enter state'}   InputElement={<SearchSelect inputClass={'w-full rounded-full text-white p-4 bg-[#333333] text-sm rounded-full placeholder-gray-500  '} options={states} placeholder='Enter State' value={FormData.state} onChange={(newValue)=>{setFormData({...FormData,state:newValue})}} />} />
        <Input id='city' label={'Enter city'} type='text' placeholder='Enter City' value={FormData.city} onChange={(newValue)=>{setFormData({...FormData,city:newValue})}}  />
        <Button label='Submit' onClick={()=>{insertIntoTable(FormData)}} />
      </div>
      <div>
      <div className='text-white font-bold text-4xl text-start  m-3'>Table : </div>
      <Table Data={TableData} setData={setTableData} />
      </div>

    </>
  )
}

export default App
