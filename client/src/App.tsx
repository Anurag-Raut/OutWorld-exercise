import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Table from '../components/Table'
import {FormInterface,DbFormInterface} from '../types/table'
import axios from 'axios'
import './App.css'

function App() {
  const initalData={
    name: '',
    email: '',
    contactnumber: '',
    state: '',
    city: '',
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberRegex = /^[0-9]+$/;

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
    let error=false;
    const emailError = document.getElementById('email');
    const contactError = document.getElementById('contact_number');

    if (!emailRegex.test(inputData.email)) {
      if(emailError){
        emailError!.style!.display='block'
      }   
      error=true;  
    }
    if (!numberRegex.test(inputData.contactnumber) || (inputData.contactnumber.length!==10) ) {
      if(contactError){
        contactError!.style!.display='block'
      }
     error=true;
    }






    if(error){
      return;
    }


    contactError!.style!.display='none'
    emailError!.style!.display='none'

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
        <Input id='state' label={'Enter state'} placeholder='Enter State' type='text' value={FormData.state} onChange={(newValue)=>{setFormData({...FormData,state:newValue})}}  />
        <Input id='city' label={'Enter city'} type='text' placeholder='Enter City' value={FormData.city} onChange={(newValue)=>{setFormData({...FormData,city:newValue})}}  />

        <Button label='Submit' onClick={()=>{insertIntoTable(FormData)}} />
      </div>

      <Table Data={TableData} setData={setTableData} />

    </>
  )
}

export default App
