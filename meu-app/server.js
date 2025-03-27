const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const port = 3000;

//Conexção ao banco de dados
mongoose
  .connect("mongodb://localhost:27017/login")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB", err);
  });

// Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando na porta 5000"));
