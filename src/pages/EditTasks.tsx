import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm, { type TaskFormData } from "../components/TaskForm";
import { useTask } from "../context/TaskContext";
import type { Task } from "../types/Task";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditTasks() {
  const { id } = useParams();
  const { tasks, updateTask } = useTask();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const task = tasks.find(
    (task) => task.id === id && task.userId === user?.sub,
  );

  if (!task) {
    return (
      <div>
        <h1>Task Not Found</h1>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  const taskId = task.id;
  const taskUserId = task.userId;

  function handleEditTask(formData: TaskFormData) {
    const updatedTask: Task = {
      id: taskId,
      userId: taskUserId,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: new Date(formData.dueDate),
    };
    updateTask(updatedTask);
    navigate("/");
  }

  return (
    <div>
      <h1 className="text-center">Edit Task</h1>
      <TaskForm
        onSubmit={handleEditTask}
        initialData={{
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate.toISOString().split("T")[0],
        }}
      />
    </div>
  );
}
