const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
const port = 3000

app.get("/", (req, res) =>{
    res.json("OLa mundo")
})


app.listen(port, () =>{
    console.log("servidor rodando na porta", port)
})