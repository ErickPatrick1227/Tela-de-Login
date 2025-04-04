const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "meusegredoseguro";

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

// Modelo de Usuário
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    senha: String,
  })
);
// Rota de Cadastros
app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  // Verifição de email já cadastrado
  const usuarioExiste = await User.findOne({ email });

  if (usuarioExiste) {
    return res.status(400).json({ mensagem: "E-mail já cadastrado" });
  }
  // Criptografar a senha antes de ser salva
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  // Criaçao de usuário
  const novoUsuario = new User({ email, senha: senhaCriptografada });
  await novoUsuario.save();

  res.json({ mensagem: "Usuário cadastrado com sucesso!" });
});

//Rota de Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await User.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ mensagem: "Usuário não encontrado" });
  }

  // Verificação de senha
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(400).json({ mensagem: "Senha incorreta" });
  }

  // Gerar token JWT
  const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "1h" });

  res.json({ mensagem: "Login bem-sucedido!", token });
});
// Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
