import { useContext } from "react";
import { AuthContext } from "./authContextObject";

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa ser usando dentro de um AuthProvider");
  }
  return contexto;
}
