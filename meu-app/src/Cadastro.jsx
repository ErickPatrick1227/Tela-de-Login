import React, { useState } from "react";
import axios from "axios";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Verificação de senhas
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        senha,
      });
      setMensagem(response.data.mensagem);
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
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Senha:</label>
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
