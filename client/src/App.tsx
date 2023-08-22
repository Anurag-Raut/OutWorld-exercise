import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Table from '../components/Table'
import {FormInterface,DbFormInterface} from '../types/table'
import axios from 'axios'
import './App.css'

function App() {

  const [FormData, setFormData] =useState<FormInterface>({
    name: '',
    email: '',
    contactNumber: '',
    state: '',
    city: '',
  })

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

    try{
      const res=await axios.post('http://localhost:5000/api/postTableData',inputData);
    
    }
    catch(err){
      console.log(err);
    }




    

  }

  console.log(TableData)

  return (
    <>
      <div>

        <Input label={'Enter name'} type='text' value={FormData.name} onChange={(newValue)=>{setFormData({...FormData,name:newValue})}}  />
        <Input label={'Enter email'} type='text' value={FormData.email} onChange={(newValue)=>{setFormData({...FormData,email:newValue})}}  />
        <Input label={'Enter contact number'} type='number' value={FormData.contactNumber} onChange={(newValue)=>{setFormData({...FormData,contactNumber:newValue})}}  />
        <Input label={'Enter state'} type='text' value={FormData.state} onChange={(newValue)=>{setFormData({...FormData,state:newValue})}}  />
        <Input label={'Enter city'} type='text' value={FormData.city} onChange={(newValue)=>{setFormData({...FormData,city:newValue})}}  />

        <Button label='Submit' onClick={()=>{insertIntoTable(FormData)}} />
      </div>

      <Table Data={TableData} setData={setTableData} />

    </>
  )
}

export default App
