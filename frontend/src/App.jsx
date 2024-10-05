import "./App.css";
import { Route, Routes } from "react-router-dom";
import UDashboard from "./pages/user/UDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import { Landing } from "./pages/Landing";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/Update";
import { useAuth } from "./hooks/auth";
import Spinner from "./components/Spinner";

function App() {
  const { authStatus, loading } = useAuth(["/signup","/login","/reset","/update"], true); 

  return (
    <>
      {loading ? (
        <Spinner /> 
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/update" element={<UpdatePassword />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/user" element={<UDashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      )}
    </>
  );
}

export default App;
