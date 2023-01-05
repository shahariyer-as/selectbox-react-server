const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

//---connect to data base ---
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wsk2b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// main async function ----------

async function run() {
  try {
    await client.connect();
    const allSelectors = client.db("SelectBox-react").collection("select-box");

    app.get("/selectors", async (req, res) => {
      const query = {};
      const cursor = allSelectors.find(query);
      const selectors = await cursor.toArray();
      res.send(selectors);
    });
  } finally {
  }
}
run().catch(console.dir);
// app listening --------------
app.get("/", (req, res) => {
  res.send("hello selectors");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
