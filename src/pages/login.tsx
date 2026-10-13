import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router";
import "../styles/login.css";
import "../index.css";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate()

  async function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/tasks")
    } catch {
      setError("Email ou senha incorretos");
    }
  }

  return (
    <>
      <div className="loginContainer">
        <form onSubmit={enviar} className="formContainer">
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            required
            minLength={8}
          />
          <button type="submit">Enviar</button>
          <p className="loginRegister">Não tem conta? 
            <Link to={"/cadastro"} className="btnRegister">Cadastre-se</Link>
            </p>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </div>
    </>
  );
}
