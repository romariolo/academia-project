const Measurement = require('../models/Measurement');

// Adiciona um novo registro de medidas para o aluno logado
const createMeasurement = async (req, res) => {
  try {
    const student_id = req.user.id;
    
    // Extrai os dados do corpo da requisição
    const { 
      is_initial, 
      bracoCm, 
      peitoCm, 
      cinturaCm, 
      quadrilCm, 
      gluteosCm, 
      coxaCm, 
      panturrilhaCm, 
      pesoKg 
    } = req.body;
    
    // Cria o registro no banco
    const newMeasurement = await Measurement.create({
      student_id,
      is_initial: is_initial || false,
      braco_cm: bracoCm,
      peito_cm: peitoCm,
      cintura_cm: cinturaCm,
      quadril_cm: quadrilCm,
      gluteos_cm: gluteosCm,
      coxa_cm: coxaCm,
      panturrilha_cm: panturrilhaCm,
      peso_kg: pesoKg
    });

    res.status(201).json(newMeasurement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar medidas.', error: error.message });
  }
};

module.exports = {
  createMeasurement
};