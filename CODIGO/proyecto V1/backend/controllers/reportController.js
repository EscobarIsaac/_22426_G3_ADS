const PDFDocument = require('pdfkit');
const Grade = require('../models/Grade');
const User = require('../models/User');

const generateGradesReport = async (req, res) => {
  try {
    const grades = await Grade.find().populate('studentId', 'name');

    const doc = new PDFDocument();
    let filename = 'reporte-calificaciones';
    filename = encodeURIComponent(filename) + '.pdf';

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.fontSize(20).text('Reporte de Calificaciones', { align: 'center' });
    doc.moveDown();

    grades.forEach((grade, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. Estudiante: ${grade.studentId.name}`)
        .text(`Materia: ${grade.subject}`)
        .text(`Lecciones: ${grade.lecciones}`)
        .text(`Proyectos: ${grade.proyectos}`)
        .text(`Exámenes: ${grade.examenes}`)
        .text(`Promedio: ${grade.promedio}`)
        .moveDown();
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ message: 'Error generando el reporte', error });
  }
};

module.exports = { generateGradesReport };
