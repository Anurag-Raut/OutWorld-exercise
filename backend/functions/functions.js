
const getTableData =async (client,table_name)=>{

    const query = `SELECT * FROM ${table_name}`;
    const result= await client.query(query);
    return result;
}

const postTableData =async (client,table_name,data)=>{
    const query = `INSERT INTO ${table_name}  (name, email, contactNumber, state, city) VALUES ('${data.name}','${data.email}','${data.contactNumber}','${data.state}','${data.city}')`;

    console.log(query,'qquery')
    const result=await client.query(query);
    return result;
}

//write code to delete data from table
const deleteTableData =async (client,table_name,data)=>{
    const query = `DELETE FROM ${table_name} WHERE id = ${data.id}`;

    console.log(query,'qquery')
    const result=await client.query(query);
    return result;
}

//write code to update data from table
const updateTableData =async (client,table_name,data)=>{
    const query = `UPDATE ${table_name} SET name = '${data.name}', email = '${data.email}', contactNumber = '${data.contactNumber}', state = '${data.state}', city = '${data.city}' WHERE id = ${data.id}`;

    console.log(query,'qquery')
    const result=await client.query(query);
    return result;
}

const getFormData =async (client,table_name,data)=>{
    const query = `SELECT * FROM ${table_name} WHERE id = ${data.id}`;


    const result=await client.query(query);
    return result;
}



module.exports={getTableData,postTableData,deleteTableData,updateTableData};