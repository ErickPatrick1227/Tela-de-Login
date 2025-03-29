import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha,
      });
      setMensagem(response.data.mensagem);

      // Se o login for bem-sucedido, redireciona para a página desejada
      if (response.status === 200) {
        navigate("/dashboard"); // Altere para a página que deseja redirecionar
      }
    } catch (error) {
      setMensagem(error.response.data.mensagem || "Erro ao fazer login");
    }
  };
  return (
    <div className="lei">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Entrar</button>
        </form>

        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export default Login;
