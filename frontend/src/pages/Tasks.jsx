import { useEffect, useState } from "react";
import "./Tasks.css";

const API_URL = "http://localhost:3000/api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load tasks");
      }

      setTasks(data.data || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      setTasks((current) =>
        current.filter((task) => task._id !== id)
      );

      setMessage("Task deleted successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="tasks-page">

      <aside className="tasks-sidebar">
        <div className="brand">
          <div className="brand-logo">S</div>
          <div>
            <h2>SmartCampus</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav>
          <button onClick={() => (window.location.href = "/")}>
            <span>¦</span>
            Dashboard
          </button>

          <button className="active">
            <span>?</span>
            Tasks
          </button>

          <button>
            <span>?</span>
            Tickets
          </button>

          <button>
            <span>?</span>
            Categories
          </button>

          <button>
            <span>?</span>
            Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <span>SmartCampus</span>
          <small>Capstone Project</small>
        </div>
      </aside>

      <main className="tasks-main">

        <header className="tasks-topbar">
          <div>
            <p className="eyebrow">CAMPUS MANAGEMENT</p>
            <h1>Tasks</h1>
            <p className="subtitle">
              Organize and manage your campus activities.
            </p>
          </div>

          <button className="refresh-btn" onClick={fetchTasks}>
            ? Refresh
          </button>
        </header>

        <section className="task-summary">
          <div className="summary-card total">
            <div className="summary-icon">T</div>
            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="summary-card completed">
            <div className="summary-icon">?</div>
            <div>
              <span>Completed</span>
              <strong>
                {tasks.filter((task) => task.status === "completed").length}
              </strong>
            </div>
          </div>

          <div className="summary-card pending">
            <div className="summary-icon">?</div>
            <div>
              <span>Pending</span>
              <strong>
                {tasks.filter((task) => task.status === "pending").length}
              </strong>
            </div>
          </div>
        </section>

        {message && (
          <div className="task-message">
            <span>?</span>
            {message}
          </div>
        )}

        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <h2>All Tasks</h2>
              <p>Your current SmartCampus activities</p>
            </div>
          </div>

          {loading ? (
            <div className="state-card">
              <div className="loader"></div>
              <p>Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="state-card empty">
              <div className="empty-icon">+</div>
              <h3>No tasks yet</h3>
              <p>
                There are currently no tasks available in SmartCampus.
              </p>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <article className="task-card" key={task._id}>

                  <div className="task-card-top">
                    <span className={`priority ${task.priority}`}>
                      {task.priority}
                    </span>

                    <button
                      className="delete-icon"
                      onClick={() => deleteTask(task._id)}
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>

                  <h3>{task.title}</h3>

                  <p className="task-description">
                    {task.description || "No description available."}
                  </p>

                  <div className="task-meta">
                    <div>
                      <span>Status</span>
                      <strong className={`status ${task.status}`}>
                        {task.status}
                      </strong>
                    </div>

                    <div>
                      <span>Category</span>
                      <strong>
                        {task.category?.name || "General"}
                      </strong>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default Tasks;
