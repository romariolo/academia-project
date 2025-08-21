const User = require('../models/User');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const { sequelize } = require('../config/database');

const getMyStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: {
        role: 'aluno',
        personal_id: req.user.id
      },
      attributes: ['id', 'nome', 'email', 'createdAt']
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos.', error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { studentId, nome, exercises } = req.body;
  const personalId = req.user.id;

  if (!studentId || !exercises || exercises.length === 0) {
    return res.status(400).json({ message: 'ID do aluno e ao menos um exercício são obrigatórios.' });
  }

  const transaction = await sequelize.transaction();

  try {
    const newWorkout = await Workout.create({
      nome,
      student_id: studentId,
      personal_id: personalId
    }, { transaction });

    const exercisesWithWorkoutId = exercises.map(ex => ({
      ...ex,
      workout_id: newWorkout.id
    }));

    const createdExercises = await Exercise.bulkCreate(exercisesWithWorkoutId, { transaction });

    await transaction.commit();

    res.status(201).json({ workout: newWorkout, exercises: createdExercises });

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Erro ao criar treino.', error: error.message });
  }
};

module.exports = {
  getMyStudents,
  createWorkout
};