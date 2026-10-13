import { useEffect, useState } from "react";
import "../styles/list.css";
import "../index.css";
import { useAuth } from "../context/useAuth";
import startIcon from "../assets/start.svg";
import trashIcon from "../assets/trash.svg";
import checkIcon from "../assets/check.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

type Priority = "low" | "medium" | "high";
type Status = "toDo" | "pending" | "completed";
type Tarefa = {
  id: number;
  text: string;
  status: Status;
  priority: Priority;
};

const priorities: { value: Priority; title: string }[] = [
  { value: "low", title: "Baixa prioridade" },
  { value: "medium", title: "Média prioridade" },
  { value: "high", title: "Alta prioridade" },
];

export default function ToDoList() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const saveData = localStorage.getItem("tarefa");
    return saveData ? JSON.parse(saveData) : [];
  });
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("low");
  const { user } = useAuth()

  function addList(): void {
    if (input.trim() === "") {
      return alert("Preencha o campo para adicionar");
    }
    const newList: Tarefa = {
      id: Date.now(),
      text: input,
      status: "toDo",
      priority: priority,
    };
    setTarefas([...tarefas, newList]);
    setInput("");
  }

  function changeStatus(idTarefa: number, newStatus: Status): void {
    const change = tarefas.map((statusChange) => {
      if (idTarefa === statusChange.id) {
        return { ...statusChange, status: newStatus };
      }
      return statusChange;
    });
    setTarefas(change);
  }

  function deleteItem(idDelete: number) {
    const deletar = tarefas.filter((tarefa) => tarefa.id !== idDelete);
    setTarefas(deletar);
  }

  const toDo = tarefas.filter((tarefa) => tarefa.status === "toDo");
  const pending = tarefas.filter((tarefa) => tarefa.status === "pending");
  const check = tarefas.filter((tarefa) => tarefa.status === "completed");

  function list(tarefa: Tarefa, nextStatus?: Status) {
    const isDone = tarefa.status === "completed";
    return (
      <li key={tarefa.id} className="task">
        <span>{tarefa.text}</span>
        <div className="acoes">
          {nextStatus && (
            <button
              className="buttonColumn"
              onClick={() => changeStatus(tarefa.id, nextStatus)}
            >
              <img
                src={startIcon}
                alt={"Botão para passar tarefa á coluna da direita"}
              />
            </button>
          )}
          <button
            className="buttonColumn delete"
            title="Excluir"
            onClick={() => deleteItem(tarefa.id)}
          >
            <img src={isDone ? checkIcon : trashIcon} alt="Excluir" />
          </button>
        </div>
      </li>
    );
  }

  function sections(listColumn: Tarefa[], nextStatus?: Status) {
    return priorities.map((p) => (
      <div key={p.value} className={`section ${p.value}`}>
        <h4>{p.title}</h4>
        <ul>
          {listColumn
            .filter((t) => t.priority === p.value)
            .map((t) => list(t, nextStatus))}
        </ul>
      </div>
    ));
  }

  useEffect(() => {
    localStorage.setItem("tarefa", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <>
      <div className="listContainer">
        <aside className="sidebar">
          <div className="titleSideBar">
            <h2>Comece aqui</h2>
            <img src={arrowDownIcon} alt="seta para baixo" />
          </div>
          <div className="sidebarBox">
            <h4>Defina a tarefa:</h4>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={20}
              className="listInput"
            />
            <h4>Defina a prioridade:</h4>
            <select
              className="listSelect"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
            <button onClick={addList} className="listButton">
              Adicionar
            </button>
          </div>
        </aside>
        <div className="conteudo">
          <header className="topbar">
            <h2>Bem-vindo(a) à sua lista de tarefa, {user?.displayName}</h2>
          </header>
          <main className="toDo">
            <div className="column toDoColumm">
              <h1>Para fazer</h1>
              {sections(toDo, "pending")}
            </div>
            <div className="column pendingColumn">
              <h1>Pendentes</h1>
              {sections(pending, "completed")}
            </div>
            <div className="column checkColumn">
              <h1>Concluidas</h1>
              {sections(check)}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
