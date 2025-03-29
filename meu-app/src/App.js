import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Dashboard from "./Dashboard"; // Importando a nova página

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <NavigationButtons />
      </div>
    </Router>
  );
}

//botão para alternar entre login e cadastro
const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Só exibe o botão se estiver na página de Login ou Cadastro
  if (location.pathname !== "/" && location.pathname !== "/cadastro") {
    return null;
  }
  return (
    <button
      onClick={() =>
        navigate(location.pathname === "/cadastro" ? "/" : "/cadastro")
      }
    >
      {window.location.pathname === "/cadastro"
        ? "Já tem conta? Faça login"
        : "Não tem uma conta? Cadastre-se"}
    </button>
  );
};

export default App;
