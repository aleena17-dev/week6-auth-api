import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <div className="profile-brand">
          <div className="profile-logo">S</div>
          <div>
            <h2>SmartCampus</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav>
          <button onClick={() => (window.location.href = "/")}>H Dashboard</button>
          <button onClick={() => (window.location.href = "/tasks")}>T Tasks</button>
          <button onClick={() => (window.location.href = "/tickets")}>Q Tickets</button>
          <button onClick={() => (window.location.href = "/categories")}>C Categories</button>
          <button className="active">P Profile</button>
        </nav>

        <div className="profile-side-footer">
          <strong>SmartCampus</strong>
          <small>Capstone Project</small>
        </div>
      </aside>

      <main className="profile-main">
        <header className="profile-topbar">
          <div>
            <p>ACCOUNT MANAGEMENT</p>
            <h1>Profile</h1>
            <span>View your SmartCampus account information.</span>
          </div>
        </header>

        <section className="profile-content">
          <div className="profile-hero">
            <div className="profile-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <span className="profile-label">SMARTCAMPUS USER</span>
              <h2>{user?.name || "User"}</h2>
              <p>{user?.email || "No email available"}</p>
            </div>

            <span className="profile-status">ACTIVE</span>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              <span>FULL NAME</span>
              <strong>{user?.name || "User"}</strong>
            </div>

            <div className="profile-card">
              <span>EMAIL ADDRESS</span>
              <strong>{user?.email || "Not available"}</strong>
            </div>

            <div className="profile-card">
              <span>ACCOUNT ROLE</span>
              <strong>{user?.role || "user"}</strong>
            </div>

            <div className="profile-card">
              <span>ACCOUNT STATUS</span>
              <strong>Active</strong>
            </div>
          </div>

          <div className="profile-security">
            <div>
              <span>SECURITY</span>
              <h3>Authenticated Account</h3>
              <p>
                Your SmartCampus session is protected through JWT-based authentication.
              </p>
            </div>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
