const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Dog = require("../DogMatchApi/module/DogShema")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
const port = 3000
//Create new dog

app.post("/add", async(req, res) =>{
     const {nameOficial, secondaryName, size, country, temperament, history, especificity} = req.body
     const dog = {
        nameOficial,
        secondaryName,
        size,
        country,
        temperament,
        history,
        especificity
     }
     try {
        const response = await Dog.create(dog);
        res.status(200).json({ message: "Dog cadastrado com sucesso", data: response });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar o dog", error: error.message });
    }

})


app.get("/", async(req, res) =>{
    try {
        const response = await Dog.find()
        if(!response || response.length === 0){
            return res.status(404).json({ message: "Nenhum dado encontrado" });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:"Erro ao buscar dados", error: error.message})
    }
})

//mongodb+srv://loidpadre:IhRPzMg7yehsZcA6@dogmatch.hdjvsay.mongodb.net/?retryWrites=true&w=majority&appName=dogMatch
mongoose.connect("mongodb+srv://loidpadre:IhRPzMg7yehsZcA6@dogmatch.hdjvsay.mongodb.net/?retryWrites=true&w=majority&appName=dogMatch").then(() =>{
    app.listen(port, () =>{
        console.log("servidor rodando na porta e BD conectado com sucesso", port)
    })
}).catch((error) =>{
    console.log("error ao se conectar com o BD")
})
