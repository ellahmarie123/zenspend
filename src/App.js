import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MaintenancePage from "./pages/MaintenancePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Main/Navbar";
import SignupPage from "./pages/SignupPage";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={user ? <MainPage user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/maintenance"
          element={
            user ? <MaintenancePage user={user} /> : <Navigate to="/login" />
          }
        />{" "}
        <Route
          path="/account"
          element={
            user ? <AccountPage user={user} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}
