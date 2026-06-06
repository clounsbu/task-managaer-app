import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTasks from "./pages/EditTasks";
import Login from "./pages/Login";

export default function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/add-task" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
      <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditTasks /></ProtectedRoute>} />
    </Routes>
    </div>
  );
}

