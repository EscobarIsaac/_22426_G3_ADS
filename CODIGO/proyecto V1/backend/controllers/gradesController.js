const Grade = require('../models/Grade');
const User = require('../models/User');

// ✅ RF04 y RF08 – Ver calificaciones con filtros según rol
const getGradesByUser = async (req, res) => {
  try {
    const user = req.user;
    const { subject, studentId } = req.query;
    let filter = {};

    if (user.role === 'student') {
      filter.studentId = user.id;
    } else if (user.role === 'teacher' || user.role === 'admin') {
      if (studentId) filter.studentId = studentId;
    } else if (user.role === 'parent') {
      const parent = await User.findById(user.id);
      const childrenIds = parent.childrenIds || [];
      filter.studentId = { $in: childrenIds };
    } else {
      return res.status(403).json({ message: 'Rol no autorizado para ver calificaciones.' });
    }

    if (subject) {
      filter.subject = subject;
    }

    const grades = await Grade.find(filter).populate('studentId', 'name');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener calificaciones.', error });
  }
};

// ✅ RF07 – Registrar calificación nueva con promedio
const createGrade = async (req, res) => {
  try {
    const { studentId, subject, lecciones, proyectos, examenes } = req.body;

    const promedio = (lecciones * 0.30 + proyectos * 0.30 + examenes * 0.40).toFixed(2);

    const grade = new Grade({
      studentId,
      subject,
      lecciones,
      proyectos,
      examenes,
      promedio
    });

    await grade.save();
    res.status(201).json({ message: 'Calificación registrada correctamente.', grade });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar calificación.', error });
  }
};

// ✅ RF06 – Editar calificación existente
const updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { lecciones, proyectos, examenes } = req.body;

    const promedio = (lecciones * 0.30 + proyectos * 0.30 + examenes * 0.40).toFixed(2);

    const updatedGrade = await Grade.findByIdAndUpdate(
      id,
      { lecciones, proyectos, examenes, promedio },
      { new: true }
    );

    if (!updatedGrade) {
      return res.status(404).json({ message: 'Calificación no encontrada.' });
    }

    res.status(200).json({ message: 'Calificación actualizada correctamente.', grade: updatedGrade });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar calificación.', error });
  }
};

module.exports = {
  getGradesByUser,
  createGrade,
  updateGrade
};
