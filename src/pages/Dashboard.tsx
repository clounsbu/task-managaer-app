import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTask } from "../context/TaskContext";
import "../App.css";

function Dashboard() {
  const { tasks, deleteTask } = useTask();
  const { user } = useAuth0();
  const userTasks = tasks.filter((task) => task.userId === user?.sub);

  return (
    <div className="d-flex flex-column align-items-center gap-5 mt-4">
      <h1>Dashboard</h1>
      <Link to="/add-task">
        {" "}
        <button>Add New Task</button>
      </Link>
      {userTasks.length === 0 && (
        <p>No tasks available. Please add some tasks.</p>
      )}

      <ul>
        {userTasks.map((task) => (
           
          <li key={task.id}>
            <h3 className="taskTitle">{task.title}</h3>
            <p>
              {" "}
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              {" "}
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              {" "}
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              {" "}
              <strong>Due:</strong> {task.dueDate.toLocaleDateString()}
            </p>

            <div className="btn">
              <Link to={`/tasks/${task.id}`}>
                {" "}
                <button className="details-btn">View Details</button>
              </Link>
              <Link to={`/edit/${task.id}`}>
                {" "}
                <button className="edit-btn">Edit</button>
              </Link>

              <button onClick={() => deleteTask(task.id)} className="deleteBtn">Delete</button>
            </div>
          </li>
          
        ))}
      </ul>
      </div>
    
  );
}

export default Dashboard;
