import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Tickets from "./pages/Tickets";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname;

  if (!token) {
    return <Login />;
  }

  if (path === "/tasks") return <Tasks />;
  if (path === "/tickets") return <Tickets />;
  if (path === "/categories") return <Categories />;
  if (path === "/profile") return <Profile />;

  return <Dashboard />;
}

export default App;
