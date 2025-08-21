import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx';

import PersonalDashboard from '../pages/personal/PersonalDashboard.jsx';
import StudentsList from '../pages/personal/StudentsList.jsx';
import CreateWorkout from '../pages/personal/CreateWorkout.jsx';
import EditWorkout from '../pages/personal/EditWorkout.jsx';
import ProgressView from '../pages/personal/ProgressView.jsx';

import StudentDashboard from '../pages/student/StudentDashboard.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/personal/dashboard" element={<PersonalDashboard />} />
      <Route path="/personal/students" element={<StudentsList />} />
      <Route path="/personal/create-workout" element={<CreateWorkout />} />
      <Route path="/personal/edit-workout/:id" element={<EditWorkout />} />
      <Route path="/personal/progress/:id" element={<ProgressView />} />

      <Route path="/student/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

export default AppRouter;
