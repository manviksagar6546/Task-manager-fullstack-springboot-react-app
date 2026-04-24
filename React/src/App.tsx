import { useState, useEffect } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API = "http://localhost:8080/api/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data: Task[] = await res.json();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });

      const newTask: Task = await res.json();
      setTasks(prev => [...prev, newTask]);
      setTitle("");
    } catch {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Task Manager</h1>

        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;