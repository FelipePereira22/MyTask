import { createBrowserRouter } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import ToDoList from "../pages/list";
import ProtectedRouter from "./route-protected";

export const router = createBrowserRouter([
    {path: "/login", Component: Login},
    {path: "/", Component: Login},
    {path: "/cadastro", Component: Register},
    {
        path: 'tasks',
        element: (
            <ProtectedRouter>
                <ToDoList/>
            </ProtectedRouter>
        )
    }
])