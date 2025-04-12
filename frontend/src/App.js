import "./App.css";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider, useUserContext } from "./context/userContext";
import { EventContextProvider } from "./context/eventContext";

axios.defaults.baseURL = process.env.BACKEND_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Protected Route
function ProtectedRoute({ element }) {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <UserContextProvider>
      <EventContextProvider>
        <div className="app-container">
          <Toaster position='bottom-center' toastOptions={{ duration: 2000 }} />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route
                path='/dashboard'
                element={<ProtectedRoute element={<Dashboard />} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </EventContextProvider>
    </UserContextProvider>
  );
}

export default App;
