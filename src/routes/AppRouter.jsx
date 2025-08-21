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
import PrivateRoute from './PrivateRoute.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/personal/dashboard" element={
        <PrivateRoute><PersonalDashboard /></PrivateRoute>
      } />
      <Route path="/personal/students" element={
        <PrivateRoute><StudentsList /></PrivateRoute>
      } />
      <Route path="/personal/create-workout" element={
        <PrivateRoute><CreateWorkout /></PrivateRoute>
      } />
      <Route path="/personal/edit-workout/:id" element={
        <PrivateRoute><EditWorkout /></PrivateRoute>
      } />
      <Route path="/personal/progress/:id" element={
        <PrivateRoute><ProgressView /></PrivateRoute>
      } />

      <Route path="/student/dashboard" element={
        <PrivateRoute><StudentDashboard /></PrivateRoute>
      } />
    </Routes>
  );
}

export default AppRouter;
