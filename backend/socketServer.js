const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const cors=require('cors');
require("dotenv").config();
const { Pool } = require("pg");


app.use(cors());
app.use(express.json());

const { DATABASE_URL } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

let client;

async function connect() {
    client = await pool.connect();
    try {
        client.query("LISTEN user_forms");
        
      
      } catch(error) {
        console.log("error",error);
      }
}

connect().then(()=>{



        client.on('notification', (notification) => {
            const payload = JSON.parse(notification.payload);
            // console.log(notification)
            // console.log('Received notification on channel', notification.channel);
            console.log('Notification payload:', payload);

            switch(payload.operation){
                case "INSERT":
                    io.emit('insert',payload.data);
                    break;
                case "DELETE":
                    console.log('delete')
                    io.emit('delete',payload.id);
                    break;
                case "UPDATE":
                    io.emit('update',payload.data);

                


            }
          
          });
    
       
    

    


})


http.listen(4000, () => {
    console.log('Socket Server is running on port 4000');
});
