import React from 'react';
import './Dashboard.css'; // Si prefieres usar archivo externo

const Dashboard = ({ user }) => {
  const data = {
    student: {
      title: 'Panel Estudiantil',
      color: '#4A90E2',
      stats: [
        { label: 'Promedio General', value: '8.9' },
        { label: 'Asistencias', value: '95%' },
        { label: 'Tareas Pendientes', value: '2' },
      ],
    },
    teacher: {
      title: 'Panel del Profesor',
      color: '#F5A623',
      stats: [
        { label: 'Cursos a Cargo', value: '4' },
        { label: 'Notas Subidas', value: '32' },
        { label: 'Estudiantes Activos', value: '120' },
      ],
    },
    admin: {
      title: 'Panel del Administrador',
      color: '#7B61FF',
      stats: [
        { label: 'Usuarios Totales', value: '450' },
        { label: 'Procesos Activos', value: '8' },
        { label: 'Reportes Hoy', value: '3' },
      ],
    },
    parent: {
      title: 'Panel de Padre de Familia',
      color: '#00C48C',
      stats: [
        { label: 'Hijos Matriculados', value: '2' },
        { label: 'Últimas Calificaciones', value: '7.8 - 9.1' },
        { label: 'Alertas', value: '1' },
      ],
    },
  };

  const role = user?.role || 'guest';
  const panel = data[role] || {
    title: 'Vista de Invitado',
    color: '#999',
    stats: [{ label: 'Acceso limitado', value: 'Visualización general' }],
  };

  return (
    <div className="dashboard">
      <h1 style={{ color: panel.color }}>{panel.title}</h1>
      <div className="card-container">
        {panel.stats.map((stat, index) => (
          <div key={index} className="card" style={{ borderTop: `4px solid ${panel.color}` }}>
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
