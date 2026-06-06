import { useState } from "react";
import type { TaskPriority, TaskStatus } from "../types/Task";


export interface TaskFormData {
    
        title: string;
        description: string;
        status: TaskStatus;
        priority: TaskPriority;
        dueDate: string;
    }

    interface TaskFormProps {
        onSubmit: (data: TaskFormData) => void;
        initialData?: TaskFormData;
    }

    export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
        const [formData, setFormData] = useState<TaskFormData>( initialData || {
            title: "",
            description: "",
            status: "pending",
            priority: "medium",
            dueDate: ""
        });
        const [error, setError] = useState("");
        
        function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
            const { name, value } = e.target;
            setFormData({...formData, [name]: value })
        };

        function handleSubmit(e: React.FormEvent) {
            e.preventDefault();

            if (!formData.title.trim()) {
                setError("Title is required");
                return;
            }

            if (!formData.dueDate) {
                setError("Due date is required");
                return;
            }
            setError("");
            onSubmit(formData);
        };

        return (
            <form className="container border border-3 p-5" onSubmit={handleSubmit}>
                <h2 className="text-center">Task Form</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="row mb-3 form-group">
                    <label>Title:</label>
                    <input className="form-control col-sm-10" 
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />  

                </div>
                <div className="row mb-3 form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="row mb-3 form-group">
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="row mb-3 form-group">
                    <label>Priority:</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="row mb-3 form-group">
                    <label>Due Date:</label>
                    <input  
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <button className="text-center" type="submit">Save Task</button>
            </form>
        );
    }