// src/pages/RoleSelectionPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaUserFriends } from 'react-icons/fa';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Selecciona tu tipo de usuario</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        <Card
          icon={<FaUserGraduate size={50} />}
          title="Estudiante"
          onClick={() => handleRoleSelection('student')}
        />
        <Card
          icon={<FaChalkboardTeacher size={50} />}
          title="Profesor"
          onClick={() => handleRoleSelection('teacher')}
        />
        <Card
          icon={<FaUserShield size={50} />}
          title="Administrador"
          onClick={() => handleRoleSelection('admin')}
        />
        <Card
          icon={<FaUserFriends size={50} />}
          title="Padre de Familia"
          onClick={() => handleRoleSelection('parent')}
        />
      </div>
    </div>
  );
};

const Card = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:bg-blue-50 transition cursor-pointer"
  >
    <div className="text-blue-600 mb-3">{icon}</div>
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
  </div>
);

export default RoleSelectionPage;
