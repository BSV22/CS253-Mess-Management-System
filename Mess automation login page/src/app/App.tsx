import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// These paths assume App.tsx is inside src/app/
// and your components are in src/app/components/
import { LoginForm } from "./components/LoginForm";
import StudentDashboard from "./pages/StudentDashboard";
import ManagerDashboard from "./pages/MessManagerDashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Routes>
          {/* Main Login / Registration Page */}
          <Route path="/" element={<LoginForm />} />
          
          {/* Dashboards */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          
          {/* Default route sends everyone to the login page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}