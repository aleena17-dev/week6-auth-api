import { useEffect, useState } from "react";
import "./Tickets.css";

const API_URL = "http://localhost:3000/api/tickets";

function Tickets() {
  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load tickets");
      }

      setTickets(data.tickets || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create ticket");
      }

      setMessage("Ticket created successfully.");

      setForm({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
      });

      setShowForm(false);
      fetchTickets();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete ticket");
      }

      setMessage("Ticket deleted successfully.");
      fetchTickets();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="tickets-page">
      <aside className="tickets-sidebar">
        <div className="tickets-brand">
          <div className="tickets-logo">S</div>

          <div>
            <h2>SmartCampus</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="tickets-nav">
          <button onClick={() => (window.location.href = "/")}>
            <span>H</span>
            Dashboard
          </button>

          <button onClick={() => (window.location.href = "/tasks")}>
            <span>T</span>
            Tasks
          </button>

          <button className="active">
            <span>Q</span>
            Tickets
          </button>

          <button>
            <span>C</span>
            Categories
          </button>

          <button>
            <span>P</span>
            Profile
          </button>
        </nav>

        <div className="tickets-sidebar-footer">
          <strong>SmartCampus</strong>
          <small>Capstone Project</small>
        </div>
      </aside>

      <main className="tickets-main">
        <header className="tickets-topbar">
          <div>
            <p className="tickets-eyebrow">CAMPUS MANAGEMENT</p>
            <h1>Support Tickets</h1>
            <p className="tickets-subtitle">
              Report and manage campus-related issues.
            </p>
          </div>

          <div className="tickets-actions">
            <button
              className="refresh-ticket-btn"
              onClick={fetchTickets}
            >
              Refresh
            </button>

            <button
              className="create-ticket-btn"
              onClick={() => setShowForm(!showForm)}
            >
              + New Ticket
            </button>
          </div>
        </header>

        <div className="tickets-content">
          {message && (
            <div className="ticket-message">
              {message}
            </div>
          )}

          {showForm && (
            <section className="ticket-form-card">
              <div className="form-heading">
                <div>
                  <span>CREATE TICKET</span>
                  <h2>Report a Campus Issue</h2>
                </div>

                <button
                  className="close-form"
                  onClick={() => setShowForm(false)}
                >
                  X
                </button>
              </div>

              <form onSubmit={createTicket}>
                <div className="form-grid">
                  <div className="ticket-field full">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. WiFi not working"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ticket-field full">
                    <label>Description</label>
                    <textarea
                      name="description"
                      placeholder="Describe the issue..."
                      value={form.description}
                      onChange={handleChange}
                      rows="4"
                      required
                    />
                  </div>

                  <div className="ticket-field">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="e.g. Network"
                      value={form.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ticket-field">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <button className="submit-ticket-btn" type="submit">
                  Create Ticket
                </button>
              </form>
            </section>
          )}

          <section className="ticket-stats">
            <div className="ticket-stat">
              <div className="ticket-stat-icon">T</div>
              <div>
                <span>Total Tickets</span>
                <strong>{tickets.length}</strong>
              </div>
            </div>

            <div className="ticket-stat">
              <div className="ticket-stat-icon blue">!</div>
              <div>
                <span>High Priority</span>
                <strong>
                  {
                    tickets.filter(
                      (ticket) => ticket.priority === "High"
                    ).length
                  }
                </strong>
              </div>
            </div>

            <div className="ticket-stat">
              <div className="ticket-stat-icon green">A</div>
              <div>
                <span>Authenticated</span>
                <strong>Yes</strong>
              </div>
            </div>
          </section>

          <section className="tickets-list-section">
            <div className="tickets-section-heading">
              <div>
                <span>SUPPORT CENTER</span>
                <h2>All Tickets</h2>
              </div>

              <p>
                {tickets.length} ticket
                {tickets.length === 1 ? "" : "s"} found
              </p>
            </div>

            {loading ? (
              <div className="ticket-state">
                <div className="ticket-loader"></div>
                <p>Loading tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="ticket-state empty-ticket">
                <div className="empty-ticket-icon">+</div>
                <h3>No tickets yet</h3>
                <p>
                  No support tickets have been reported yet.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="empty-create-btn"
                >
                  Create First Ticket
                </button>
              </div>
            ) : (
              <div className="tickets-grid">
                {tickets.map((ticket) => (
                  <article className="ticket-card" key={ticket._id}>
                    <div className="ticket-card-header">
                      <span
                        className={`priority-badge ${ticket.priority}`}
                      >
                        {ticket.priority}
                      </span>

                      <button
                        className="ticket-delete"
                        onClick={() => deleteTicket(ticket._id)}
                        title="Delete ticket"
                      >
                        X
                      </button>
                    </div>

                    <h3>{ticket.title}</h3>

                    <p className="ticket-description">
                      {ticket.description ||
                        "No description available."}
                    </p>

                    <div className="ticket-details">
                      <div>
                        <span>Category</span>
                        <strong>{ticket.category}</strong>
                      </div>

                      <div>
                        <span>Created By</span>
                        <strong>
                          {ticket.createdBy?.name || "Current User"}
                        </strong>
                      </div>
                    </div>

                    <div className="ticket-id">
                      ID: {ticket._id}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Tickets;
