import { Link, useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useAuth0 } from "@auth0/auth0-react";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks } = useTask();
  const { user } = useAuth0();
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

  return (
    <div className="text-center">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due: {task.dueDate.toLocaleDateString()}</p>
      <div className="d-flex gap-3 justify-content-center">
        <Link to={`/edit/${task.id}`}>
          {" "}
          <button className="edit-btn">Edit Task</button>
        </Link>
        <Link to="/"> <button>Back to Dashboard</button> </Link>
      </div>
    </div>
  );
}
