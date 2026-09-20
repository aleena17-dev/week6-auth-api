import { useEffect, useState } from "react";
import "./Dashboard.css";

const API_BASE = "http://localhost:3000/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    tasks: 0,
    tickets: 0,
    categories: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const goToTasks = () => {
    window.location.href = "/tasks";
  };

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError("");

        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {};

        const [tasksResponse, ticketsResponse, categoriesResponse] =
          await Promise.all([
            fetch(`${API_BASE}/tasks`),
            fetch(`${API_BASE}/tickets`, {
              headers,
            }),
            fetch(`${API_BASE}/categories`),
          ]);

        const tasksData = await tasksResponse.json();
        const ticketsData = await ticketsResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (!tasksResponse.ok) {
          throw new Error(tasksData.message || "Failed to load tasks");
        }

        if (!ticketsResponse.ok) {
          throw new Error(
            ticketsData.message || "Failed to load tickets"
          );
        }

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData.message || "Failed to load categories"
          );
        }

        const tasks = tasksData.data || [];
        const tickets = ticketsData.tickets || [];
        const categories = categoriesData.data || [];

        setStats({
          tasks: tasks.length,
          tickets: tickets.length,
          categories: categories.length,
          completedTasks: tasks.filter(
            (task) => task.status === "completed"
          ).length,
          pendingTasks: tasks.filter(
            (task) => task.status === "pending"
          ).length,
        });
      } catch (error) {
        console.error("Dashboard stats error:", error);
        setStatsError(
          "Some dashboard statistics could not be loaded."
        );
      } finally {
        setLoadingStats(false);
      }
    };

    loadDashboardStats();
  }, [token]);

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">S</div>

          <div>
            <h2>SmartCampus</h2>
            <span>Campus Management</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button className="nav-item" onClick={goToTasks}>
            <span className="nav-icon">✓</span>
            <span>Tasks</span>
          </button>

          <button className="nav-item" onClick={() => (window.location.href = "/tickets")}><span className="nav-icon">▣</span><span>Tickets</span></button>

          <button className="nav-item" onClick={() => (window.location.href = "/categories")}><span className="nav-icon">◈</span><span>Categories</span></button>

          <button className="nav-item" onClick={() => (window.location.href = "/profile")}><span className="nav-icon">◯</span><span>Profile</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="project-badge">
            <span className="project-dot"></span>

            <div>
              <strong>SmartCampus</strong>
              <small>Capstone Project</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-title">
            <span className="topbar-label">
              CAMPUS MANAGEMENT SYSTEM
            </span>

            <h1>Dashboard</h1>
          </div>

          <div className="topbar-user">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="user-details">
              <strong>{user?.name || "User"}</strong>
              <span>{user?.role || "User"}</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-section">
            <div className="welcome-text">
              <span className="welcome-label">WELCOME BACK</span>

              <h2>
                Hello, <span>{user?.name || "User"}</span> 👋
              </h2>

              <p>
                Manage your campus activities, tasks and support
                requests from one simple workspace.
              </p>

              <button className="primary-action" onClick={goToTasks}>
                View Tasks
                <span>→</span>
              </button>
            </div>

            <div className="welcome-visual">
              <div className="visual-circle circle-one"></div>
              <div className="visual-circle circle-two"></div>

              <div className="visual-card">
                <span>SC</span>
                <small>SmartCampus</small>
              </div>
            </div>
          </section>

          {statsError && (
            <div className="dashboard-error">
              {statsError}
            </div>
          )}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">✓</div>

              <div>
                <span>Total Tasks</span>
                <strong>
                  {loadingStats ? "..." : stats.tasks}
                </strong>
                <small>
                  {loadingStats
                    ? "Loading..."
                    : `${stats.completedTasks} completed · ${stats.pendingTasks} pending`}
                </small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">▣</div>

              <div>
                <span>Support Tickets</span>
                <strong>
                  {loadingStats ? "..." : stats.tickets}
                </strong>
                <small>Reported campus issues</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon cyan">◈</div>

              <div>
                <span>Categories</span>
                <strong>
                  {loadingStats ? "..." : stats.categories}
                </strong>
                <small>Available campus categories</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">●</div>

              <div>
                <span>Account Status</span>
                <strong>Active</strong>
                <small>
                  {user?.role === "admin"
                    ? "Administrator account"
                    : "Authenticated account"}
                </small>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <div>
                <span className="section-label">WORKSPACE</span>
                <h2>Quick Actions</h2>
              </div>

              <p>Access the main SmartCampus modules</p>
            </div>

            <div className="action-grid">
              <button className="action-card" onClick={goToTasks}>
                <div className="action-icon">✓</div>

                <div className="action-content">
                  <h3>Tasks</h3>

                  <p>
                    Create, manage and track campus tasks
                    and activities.
                  </p>

                  <span className="action-link">
                    Open Tasks <b>→</b>
                  </span>
                </div>
              </button>

              <button className="action-card" onClick={() => (window.location.href = "/tickets")}><div className="action-icon">▣</div>

                <div className="action-content">
                  <h3>Tickets</h3>

                  <p>
                    Manage support requests and reported
                    campus issues.
                  </p>

                  <span className="action-link">
                    Support Center <b>→</b>
                  </span>
                </div>
              </button>

              <button className="action-card" onClick={() => (window.location.href = "/categories")}><div className="action-icon">◈</div>

                <div className="action-content">
                  <h3>Categories</h3>

                  <p>
                    Organize academic and campus-related
                    information.
                  </p>

                  <span className="action-link">
                    View Categories <b>→</b>
                  </span>
                </div>
              </button>

              <button className="action-card" onClick={() => (window.location.href = "/profile")}><div className="action-icon">◯</div>

                <div className="action-content">
                  <h3>Profile</h3>

                  <p>
                    View your account details and personal
                    information.
                  </p>

                  <span className="action-link">
                    View Profile <b>→</b>
                  </span>
                </div>
              </button>
            </div>
          </section>

          <section className="security-card">
            <div className="security-icon">✓</div>

            <div>
              <h3>Your account is protected</h3>

              <p>
                SmartCampus uses authenticated access to
                protect your campus management data.
              </p>
            </div>

            <span className="secure-badge">SECURE</span>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

