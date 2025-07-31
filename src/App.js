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
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            !user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />
          }
        />
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
