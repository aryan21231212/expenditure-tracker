const express = require("express")
const Expenditure = require("./model/expenditure.js")
const cors = require("cors")




const app = express();
app.use(cors());
app.use(express.json()); 

app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

app.post("/expenditure",async (req,res)=>{
   await Expenditure.insertOne(req.body);
    res.send("welcome")
})

app.get("/get",async (req,res)=>{
    let data = await Expenditure.find();
    res.json(data)
})