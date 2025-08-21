const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, connectDB } = require('./config/database');
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const personalRoutes = require('./routes/personalRoutes');

// Modelos
const User = require('./models/User');
const Workout = require('./models/Workout');
const Exercise = require('./models/Exercise');

// --- Definir Associações ---
User.hasMany(Workout, { foreignKey: 'personal_id', as: 'CreatedWorkouts' });
User.hasMany(Workout, { foreignKey: 'student_id', as: 'ReceivedWorkouts' });
Workout.belongsTo(User, { foreignKey: 'personal_id', as: 'Personal' });
Workout.belongsTo(User, { foreignKey: 'student_id', as: 'Student' });

Workout.hasMany(Exercise, { foreignKey: 'workout_id', onDelete: 'CASCADE' });
Exercise.belongsTo(Workout, { foreignKey: 'workout_id' });
// ----------------------------

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar as rotas
app.use('/api', mainRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/personal', personalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
});