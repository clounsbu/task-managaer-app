import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TaskForm, { type TaskFormData } from "../components/TaskForm";
import { useTask } from "../context/TaskContext";
import type { Task } from "../types/Task";

export default function AddTask() {
  const { addTask } = useTask();
  const { user } = useAuth0();
  const navigate = useNavigate();

  function handleAddTask(formData: TaskFormData) {
    if (!user?.sub) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      userId: user.sub,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: new Date(formData.dueDate),
    };

    addTask(newTask);
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-center">Add New Task</h1>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
}
