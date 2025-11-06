const User = require('../models/User');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const Measurement = require('../models/Measurement');

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
      include: [
        {
          model: Workout,
          as: 'ReceivedWorkouts',
          include: [{ model: Exercise }]
        },
        {
          model: Measurement,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("ERRO NO GETME:", error); // Adiciona um log mais visível do erro no backend
    res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    await user.update(req.body);
    const userResponse = { ...user.toJSON() };
    delete userResponse.password_hash;
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
  }
};

module.exports = {
  getMe,
  updateMe
};