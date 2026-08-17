import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv/config';

const app = express();
app.use(express.json())
app.use(cors())

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{dbName:"student"});
    console.log("dbconnected")
}

const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    gender:String,
    age:String,
    phone:String
})

const student =  mongoose.model ("student",studentSchema)


app.get("/", (req, res) => {
    res.send("Node app running successfully");
});

app.post("/post", async (req,res)=>{
const postdata = await student.create(req.body)
res.json(postdata)
})

app.get("/get", async (req,res)=>{
const getdata = await student.find({})
res.json(getdata)
})

app.put("/:id", async (req,res)=>{
const putdata = await student.findByIdAndUpdate(req.params.id,req.body, {new:true})
res.json(putdata)
})

app.delete("/:id", async (req,res)=>{
    const deletedata = await student.findByIdAndDelete(req.params.id)
})

connectdb()

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});