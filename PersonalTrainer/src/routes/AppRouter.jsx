import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx';

import PersonalDashboard from '../pages/personal/PersonalDashboard.jsx';
import StudentDashboard from '../pages/student/StudentDashboard.jsx';
import NutritionistDashboard from '../pages/nutritionist/NutritionistDashboard.jsx';

import ClientList from '../pages/nutritionist/ClientList.jsx';
import CreateDietPlan from '../pages/nutritionist/CreateDietPlan.jsx';

import PrivateRoute from './PrivateRoute.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/personal/dashboard" element={<PrivateRoute><PersonalDashboard /></PrivateRoute>} />
      
      <Route path="/student/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />

      <Route path="/nutritionist/dashboard" element={<PrivateRoute><NutritionistDashboard /></PrivateRoute>} />
      <Route path="/nutritionist/clients" element={<PrivateRoute><ClientList /></PrivateRoute>} />
      <Route path="/nutritionist/create-plan" element={<PrivateRoute><CreateDietPlan /></PrivateRoute>} />
    </Routes>
  );
}

export default AppRouter;