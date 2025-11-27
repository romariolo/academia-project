const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, connectDB } = require('./config/database');
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const personalRoutes = require('./routes/personalRoutes');
const studentRoutes = require('./routes/studentRoutes');
const nutritionistRoutes = require('./routes/nutritionistRoutes'); // <--- IMPORTAR AQUI

// Modelos
const User = require('./models/User');
const Workout = require('./models/Workout');
const Exercise = require('./models/Exercise');
const Measurement = require('./models/Measurement');
const DietPlan = require('./models/DietPlan');
const Meal = require('./models/Meal');
const FoodItem = require('./models/FoodItem');

// --- Associações (Mantidas iguais ao que definimos antes) ---
User.hasMany(Workout, { foreignKey: 'personal_id', as: 'CreatedWorkouts' });
User.hasMany(Workout, { foreignKey: 'student_id', as: 'ReceivedWorkouts' });
Workout.belongsTo(User, { foreignKey: 'personal_id', as: 'Personal' });
Workout.belongsTo(User, { foreignKey: 'student_id', as: 'Student' });

Workout.hasMany(Exercise, { foreignKey: 'workout_id', onDelete: 'CASCADE' });
Exercise.belongsTo(Workout, { foreignKey: 'workout_id' });

User.hasMany(Measurement, { foreignKey: 'student_id' });
Measurement.belongsTo(User, { foreignKey: 'student_id' });

User.hasMany(DietPlan, { foreignKey: 'nutritionist_id', as: 'CreatedDietPlans' });
User.hasMany(DietPlan, { foreignKey: 'student_id', as: 'ReceivedDietPlans' });
DietPlan.belongsTo(User, { foreignKey: 'nutritionist_id', as: 'Nutritionist' });
DietPlan.belongsTo(User, { foreignKey: 'student_id', as: 'Student' });

DietPlan.hasMany(Meal, { foreignKey: 'diet_plan_id', onDelete: 'CASCADE' });
Meal.belongsTo(DietPlan, { foreignKey: 'diet_plan_id' });

Meal.hasMany(FoodItem, { foreignKey: 'meal_id', onDelete: 'CASCADE' });
FoodItem.belongsTo(Meal, { foreignKey: 'meal_id' });
// ----------------------------

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar as rotas
app.use('/api', mainRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/nutritionist', nutritionistRoutes); // <--- USAR A ROTA AQUI

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