import express from "express"

const app = express()

app.get("/",(req,res) =>{
    res.send("server is ready")
})


app.listen(5000, () => {
    console.log ("Server Started at http://localhost:5000")
})