import "./App.css";
import {Route,Routes} from "react-router-dom";
import UDashboard from "./pages/user/UDashboard"
import Dashboard from "./pages/admin/Dashboard"
import Login from "./pages/Login"
import { Landing } from "./pages/Landing";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<Dashboard/>} />
        <Route path="/user" element={<UDashboard/>} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </>
  );
}

export default App;
