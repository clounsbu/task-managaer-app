import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type {Task} from "../types/Task";

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    updateTask: (updatedTask: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    function addTask(task: Task) {
        setTasks([...tasks, task]);
    }
    function deleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id));
    }
    function updateTask(updatedTask: Task) {
        setTasks(
            tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }
    
    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );

}

export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }   
    return context;
}
