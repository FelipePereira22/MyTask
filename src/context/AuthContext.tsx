import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthContext } from "./authContextObject";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cancelarEscuta = onAuthStateChanged(auth, (usuarioAtual) => {
      setUser(usuarioAtual);
      setLoading(false);
    });

    return () => cancelarEscuta();
  }, []);

  async function login(email: string, senha: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, senha);
  }

  async function register(email: string, senha: string, name: string): Promise<void> {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: name });

    setUser({...credencial.user});
  }

  async function logout(): Promise<void> {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
