const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Dog = require("./DogShema");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = 3000;

//rota para criar novo dado
app.post("/dogs/add", async (req, res) => {
  const {
    nameOficial,
    img,
    secondaryName,
    size,
    country,
    temperament,
    history,
    especificity,
  } = req.body;
  const dog = {
    nameOficial,
    img,
    secondaryName,
    size,
    country,
    temperament,
    history,
    especificity,
  };
  try {
    const response = await Dog.create(dog);
    res
      .status(200)
      .json({ message: "Dog cadastrado com sucesso", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar o dog", error: error.message });
  }
});
//rota para pegar todos os dados
app.get("/dogs", async (req, res) => {
  try {
    const response = await Dog.find();
    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Nenhum dado encontrado" });
    }
    res
      .status(200)
      .json({ message: "Sucesso ao buscar dados", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar dados", error: error.message });
  }
});
//rota para pegar um dado pelo seu id
app.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Dog.findById(id);
    if (!response) {
      res
        .status(404)
        .json({ message: "Item não encontrado", error: error.message });
    }
    res
      .status(200)
      .json({ message: "item pegado com Sucesso", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar o dado", error: error.message });
  }
});
// Roata para actulizar dado actualizar dados
app.put("/dogs/:id", async (req, res) => {
  const {
    nameOficial,
    img,
    secondaryName,
    size,
    country,
    temperament,
    history,
    especificity,
  } = req.body;
  const dog = {
    nameOficial,
    img,
    secondaryName,
    size,
    country,
    temperament,
    history,
    especificity,
  };
  try {
    const { id } = req.params;
    const response = await Dog.findByIdAndUpdate(id, dog);
    if (!response) {
      res.status(404).json({ message: "item não encontrado" });
    }
    res
      .status(200)
      .json({ message: "Item editado com sucesso", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar dado", error: error.message });
  }
});

app.delete("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Dog.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ message: "Item não encontrado" });
    }
    res
      .status(200)
      .json({ message: "Item deletado com sucesso", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar dado", error: error.message });
  }
});

//mongodb+srv://loidpadre:IhRPzMg7yehsZcA6@dogmatch.hdjvsay.mongodb.net/?retryWrites=true&w=majority&appName=dogMatch
mongoose
  .connect(
    "mongodb+srv://loidpadre:IhRPzMg7yehsZcA6@dogmatch.hdjvsay.mongodb.net/?retryWrites=true&w=majority&appName=dogMatch",
  )
  .then(() => {
    app.listen(port, () => {
      console.log("servidor rodando na porta e BD conectado com sucesso", port);
    });
  })
  .catch((error) => {
    console.log("error ao se conectar com o BD", error);
  });
