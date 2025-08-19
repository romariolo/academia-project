import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

import PersonalDashboard from '../pages/personal/PersonalDashboard';
import StudentsList from '../pages/personal/StudentsList';
import CreateWorkout from '../pages/personal/CreateWorkout';
import EditWorkout from '../pages/personal/EditWorkout';
import ProgressView from '../pages/personal/ProgressView';

import StudentDashboard from '../pages/student/StudentDashboard';

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
