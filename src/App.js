import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MaintenancePage from "./pages/MaintenancePage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Main/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
