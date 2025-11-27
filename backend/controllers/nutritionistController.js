const User = require('../models/User');
const DietPlan = require('../models/DietPlan');
const Meal = require('../models/Meal');
const FoodItem = require('../models/FoodItem');
const { sequelize } = require('../config/database');

// Listar clientes do nutricionista logado
const getMyClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: {
        role: 'aluno',
        nutritionist_id: req.user.id
      },
      attributes: ['id', 'nome', 'email', 'foto_url']
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes.', error: error.message });
  }
};

// Criar um plano alimentar completo
const createDietPlan = async (req, res) => {
  const { studentId, nome, observacoes, meals } = req.body;
  const nutritionistId = req.user.id;

  if (!studentId || !nome || !meals || meals.length === 0) {
    return res.status(400).json({ message: 'Dados incompletos. Informe aluno, nome do plano e refeições.' });
  }

  const transaction = await sequelize.transaction();

  try {
    // 1. Criar o Plano
    const newPlan = await DietPlan.create({
      nome,
      observacoes,
      student_id: studentId,
      nutritionist_id: nutritionistId
    }, { transaction });

    // 2. Iterar sobre as refeições
    for (const mealData of meals) {
      const newMeal = await Meal.create({
        nome: mealData.nome,
        horario: mealData.horario,
        diet_plan_id: newPlan.id
      }, { transaction });

      // 3. Iterar sobre os alimentos da refeição
      if (mealData.foods && mealData.foods.length > 0) {
        const foodsWithMealId = mealData.foods.map(food => ({
          descricao: food.descricao,
          quantidade: food.quantidade,
          meal_id: newMeal.id
        }));
        
        await FoodItem.bulkCreate(foodsWithMealId, { transaction });
      }
    }

    await transaction.commit();
    res.status(201).json({ message: 'Plano alimentar criado com sucesso!', planId: newPlan.id });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar plano alimentar.', error: error.message });
  }
};

module.exports = {
  getMyClients,
  createDietPlan
};