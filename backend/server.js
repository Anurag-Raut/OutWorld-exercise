const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const app = express();
const { getTableData, postTableData, deleteTableData, updateTableData } = require("./functions/functions");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { DATABASE_URL } = process.env;
// const subscriber = createSubscriber({ connectionString: DATABASE_URL })


const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

let client;



// subscriber.notifications.on("change", (payload) => {
//   // Payload as passed to subscriber.notify() (see below)
//   console.log("Received notification in 'my-channel':", payload)
// })

async function connect() {
  client = await pool.connect();


}



app.post("/api/getTableData", async (req, res) => {
  try {
    const ans = await getTableData(client, "user_forms");
    res.status(200).json(ans.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/postTableData", async (req, res) => {
  try {
    const newData = req.body;
    // console.log(newData);
    const ans = await postTableData(client, "user_forms", newData);
    // res.status(200).json(ans.rows);
    res.sendStatus(200);
    // console.log(ans);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});


app.post("/api/deleteTableData", async (req, res) => {
  try {
    const {id} = req.body;
    // console.lo
    // console.log(newData);
    const ans = await deleteTableData(client, "user_forms", {id:id});
    res.sendStatus(200);
    // console.log(ans);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/updateTableData", async (req, res) => {
  try {
    const newData = req.body;
    // console.log(newData);
    const ans = await updateTableData(client, "user_forms", newData);
    res.sendStatus(200);    

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}
);





connect()

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
