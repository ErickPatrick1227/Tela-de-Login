import React, { useState } from "react";
import Login from "./Login";
import Cadastro from "./Cadastro";

function App() {
  const [pagina, setPagina] = useState("login");

  return (
    <div className="App">
      {pagina === "login" ? <Login /> : <Cadastro />}
      <button
        onClick={() => setPagina(pagina === "login" ? "cadastro" : "login")}
      >
        {pagina === "login"
          ? "Não tem uma conta? Cadastre-se"
          : "Já tem conta? Faça login"}
      </button>
    </div>
  );
}

export default App;
