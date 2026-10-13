import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import type { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router";
import "../styles/register.css";
import "../index.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate()

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await register(email, password, name);
      navigate("/login")
    } catch (err) {
      const erro = err as FirebaseError;

      if (erro.code === "auth/email-already-in-use") {
        setError("Esse e-mail já está cadastrado");
      } else if (erro.code === "auth/weak-password") {
        setError("A senha precisa ter pelo menos 6 caracteres");
      } else if (erro.code === "auth/invalid-email") {
        setError("E-mail inválido");
      } else {
        setError("Não foi possível cadastrar, tente novamente");
      }
    }
  }

  return (
    <>
      <div className="registerContainer">
        <form onSubmit={send} className="formContainer">
          <h2>Cadastro</h2>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(n) => setName(n.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(p) => setPassword(p.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(cp) => setConfirmPassword(cp.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <p className="register">Já tem conta?
            <Link to={"/login"} className="registerLogin">Crie aqui</Link>
            </p>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </div>
    </>
  );
}
