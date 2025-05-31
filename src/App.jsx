import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//? importing pages
import HomePage from "./pages/HomePage";
import StudentPortfolio from "./pages/student_form";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./pages/UserProfile";
import DashboardPage from "./pages/Dashboard";
import AdminPortal from "./pages/AdminPortal";
import NoticePage from "./pages/NoticePage";
import FacultyPage from "./pages/FacultyPage";
import EventsPage from "./pages/EventsPage";
import RoutinesPage from "./pages/RoutinesPage";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { setLogout } from "./state";
import { setLogin } from "./state";
import PromptForKey from "./components/PromptKey";
import ResetPassword from "./pages/ResetPassword";
import ResetNewPassword from "./pages/NewPassword";

//* Create a Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans, sans-serif", // Apply Noto Sans to all text
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          //  height: "48px", // Set a fixed height
          "& .MuiOutlinedInput-root": {
            //  height: "48px",
            borderRadius: "8px", // Slightly rounded corners
          },
          "& .MuiInputBase-input": {
            //height: "48px",
            //padding: "12px", // Ensure proper padding inside
          },
        },
      },
    },
  },
});

const ADMIN_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY;

const PrivateRoute = ({ children }) => {
  const keyMatch = sessionStorage.getItem('adminKey') === ADMIN_KEY;
  useEffect(() => {
    return () => {
      // Clear the key ONLY if user is leaving the admin route
      if (location.pathname === '/admin') {
        sessionStorage.removeItem('adminKey');
      }
    };
  }, [location.pathname]);

  //  useEffect(() => {
  //   const clearOnUnload = () => {
  //     localStorage.removeItem('adminKey');
  //   };
  //   window.addEventListener('beforeunload', clearOnUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', clearOnUnload);
  //   };
  // }, []);

  if (keyMatch) return children;
  return <PromptForKey />;
};

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      if (localStorage.getItem("user")) {
        fetchUserProfile(token.split("=")[1]); // e
      }
      const userData = JSON.parse(atob(token.split("=")[1].split(".")[1]));
      dispatch(setLogin({ user: userData, token: token.split("=")[1] }));
    } else {
      dispatch(setLogout());
    }
  }, [dispatch]);

  //todo Have to do local storage encryption later on for data security
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(
        "https://jumechserver.onrender.com/users/creds-primary",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(setLogin({ user: data.user, token }));
      } else {
        console.error("Error fetching user profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/"
            element={<AuthPage fetchUserProfile={fetchUserProfile} />}
          />
          <Route
            path="/updateform/:username"
            element={user?(<StudentPortfolio fetchUserProfile={fetchUserProfile} />):(<Navigate to="/" />)}
          />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <AuthPage />}
          />
            <Route path="/forgot" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetNewPassword/>}/>
          <Route path="/admin" element={<PrivateRoute><AdminPortal /></PrivateRoute>} />
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/routines" element={<RoutinesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
