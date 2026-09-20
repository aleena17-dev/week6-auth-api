import { useEffect, useState } from "react";
import "./Categories.css";

const API_URL = "http://localhost:3000/api/categories";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load categories");
      }

      setCategories(data.data || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createCategory = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      setMessage("Category created successfully.");

      setForm({
        name: "",
        description: "",
      });

      setShowForm(false);
      fetchCategories();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      setMessage("Category deleted successfully.");
      fetchCategories();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="categories-page">
      <aside className="categories-sidebar">
        <div className="categories-brand">
          <div className="categories-logo">S</div>

          <div>
            <h2>SmartCampus</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="categories-nav">
          <button onClick={() => (window.location.href = "/")}>
            <span>H</span>
            Dashboard
          </button>

          <button onClick={() => (window.location.href = "/tasks")}>
            <span>T</span>
            Tasks
          </button>

          <button onClick={() => (window.location.href = "/tickets")}>
            <span>Q</span>
            Tickets
          </button>

          <button className="active">
            <span>C</span>
            Categories
          </button>

          <button>
            <span>P</span>
            Profile
          </button>
        </nav>

        <div className="categories-sidebar-footer">
          <strong>SmartCampus</strong>
          <small>Capstone Project</small>
        </div>
      </aside>

      <main className="categories-main">
        <header className="categories-topbar">
          <div>
            <p className="categories-eyebrow">CAMPUS MANAGEMENT</p>
            <h1>Categories</h1>
            <p className="categories-subtitle">
              Organize academic and campus-related information.
            </p>
          </div>

          <div className="categories-actions">
            <button
              className="refresh-category-btn"
              onClick={fetchCategories}
            >
              Refresh
            </button>

            <button
              className="create-category-btn"
              onClick={() => setShowForm(!showForm)}
            >
              + New Category
            </button>
          </div>
        </header>

        <div className="categories-content">
          {message && (
            <div className="category-message">
              {message}
            </div>
          )}

          {showForm && (
            <section className="category-form-card">
              <div className="category-form-heading">
                <div>
                  <span>CREATE CATEGORY</span>
                  <h2>Add a New Category</h2>
                </div>

                <button
                  className="close-category-form"
                  onClick={() => setShowForm(false)}
                >
                  X
                </button>
              </div>

              <form onSubmit={createCategory}>
                <div className="category-form-grid">
                  <div className="category-field">
                    <label>Category Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Academic"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="category-field">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Describe this category"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  className="submit-category-btn"
                  type="submit"
                >
                  Create Category
                </button>
              </form>
            </section>
          )}

          <section className="category-summary">
            <div className="category-summary-card">
              <div className="category-summary-icon">C</div>

              <div>
                <span>Total Categories</span>
                <strong>{categories.length}</strong>
              </div>
            </div>

            <div className="category-summary-card">
              <div className="category-summary-icon blue">A</div>

              <div>
                <span>Academic</span>
                <strong>
                  {
                    categories.filter((category) =>
                      category.name
                        ?.toLowerCase()
                        .includes("academic")
                    ).length
                  }
                </strong>
              </div>
            </div>

            <div className="category-summary-card">
              <div className="category-summary-icon green">✓</div>

              <div>
                <span>Available</span>
                <strong>{categories.length}</strong>
              </div>
            </div>
          </section>

          <section className="categories-list-section">
            <div className="categories-section-heading">
              <div>
                <span>CAMPUS ORGANIZATION</span>
                <h2>All Categories</h2>
              </div>

              <p>
                {categories.length} categor
                {categories.length === 1 ? "y" : "ies"} found
              </p>
            </div>

            {loading ? (
              <div className="category-state">
                <div className="category-loader"></div>
                <p>Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="category-state empty-category">
                <div className="empty-category-icon">+</div>

                <h3>No categories yet</h3>

                <p>
                  Create your first category to organize
                  campus information.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="empty-category-btn"
                >
                  Create First Category
                </button>
              </div>
            ) : (
              <div className="categories-grid">
                {categories.map((category, index) => (
                  <article
                    className="category-card"
                    key={category._id}
                  >
                    <div className="category-card-top">
                      <div className="category-card-icon">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <button
                        className="category-delete"
                        onClick={() =>
                          deleteCategory(category._id)
                        }
                        title="Delete category"
                      >
                        X
                      </button>
                    </div>

                    <h3>{category.name}</h3>

                    <p>
                      {category.description ||
                        "No description available."}
                    </p>

                    <div className="category-card-footer">
                      <span>SMARTCAMPUS</span>
                      <small>Available</small>
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

export default Categories;
