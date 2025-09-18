import Dashboard from './pages/Dashboard';
import './App.css';
import { FaUser } from "react-icons/fa";
function App() {
  return (
    <div className="app-layout">
      {/* Navbar */}
      <header className="app-navbar">
        <h1 className="navbar-title">📚 Book Management App</h1>
        <div><FaUser /> &nbsp;MohmadSohilkhan</div> 
      </header>

      {/* Main Content */}
      <main className="app-main">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        © {new Date().getFullYear()} Book Management App&nbsp;
       /&nbsp; GitHub : &nbsp;<a href='https://github.com/Starboy90/Book_Management_App'>
        Book Management App
        </a>
      </footer>
    </div>
  );
}

export default App;
