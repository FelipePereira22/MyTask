# 📝 MyTask - Gerenciador de Tarefas

O **MyTask** é uma aplicação web completa desenvolvida em **React** com **TypeScript** para gestão e organização de tarefas pessoais estilo Kanban/Colunas. A aplicação conta com autenticação de utilizadores em tempo real integrada com o **Firebase** e persistência de dados local.

---

## 🚀 Funcionalidades

- 🔐 **Autenticação de Utilizadores**: Registro e Login integrados com Firebase Auth.
- 🛡️ **Rotas Protegidas**: Restrição de acesso à dashboard de tarefas apenas para utilizadores autenticados.
- 📋 **Gestão de Tarefas (Kanban)**:
  - Organização por colunas: *Para fazer*, *Pendentes* e *Concluídas*.
  - Classificação por níveis de prioridade: *Baixa*, *Média* e *Alta*.
  - Transição de estados e eliminação de tarefas.
- 💾 **Persistência de Dados**: Armazenamento automático das tarefas no `localStorage`.
- 🔑 **Segurança**: Configuração de chaves de API protegidas por variáveis de ambiente (`.env`).

---

## 🛠️ Tecnologias Utilizadas

- **Front-end**: React, TypeScript, Vite
- **Roteamento**: React Router v7
- **Gestão de Estado**: Context API (`AuthContext`)
- **Backend / BaaS**: Firebase (Authentication & Firestore)
