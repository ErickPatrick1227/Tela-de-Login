import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Verificação de senhas
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/register", { email, senha });
      setMensagem("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMensagem(
        error.response?.data?.mensagem || "Erro ao cadastrar usuário"
      );
    }
  };

  return (
    <div className="lei">
      <div>
        <h2>Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha: </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Senha: </label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>

        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Cadastro;
