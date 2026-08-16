import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv/config';

const app = express();
app.use(express.json())
app.use(cors())

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("dbconnected")
}

const userShema = new mongoose.Schema({
    name:String,
    age:String
})

const user =  mongoose.model ("user",userShema)


app.get("/", (req, res) => {
    res.send("Node app running successfully");
});

app.post("/post", async (req,res)=>{
const postdata = await user.create(req.body)
res.json(postdata)
})

app.get("/get", async (req,res)=>{
const getdata = await user.find({})
res.json(getdata)
})

app.put("/:id", async (req,res)=>{
const putdata = await user.findByIdAndUpdate(req.params.id,req.body, {new:true})
res.json(putdata)
})

app.delete("/:id", async (req,res)=>{
    const deletedata = await user.findByIdAndDelete(req.params.id)
})

connectdb()

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});