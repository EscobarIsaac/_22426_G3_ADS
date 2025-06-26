import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const GradesPage = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/grades`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setGrades(res.data);
      } catch (error) {
        console.error("Error al obtener las calificaciones:", error);
      }
    };

    if (user) {
      fetchGrades();
    }
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Calificaciones Registradas</h1>
      <table border="1" cellPadding="8" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Asignatura</th>
            <th>Parcial 1</th>
            <th>Parcial 2</th>
            <th>Examen</th>
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade._id}>
              <td>{grade.studentName}</td>
              <td>{grade.subject}</td>
              <td>{grade.partial1}</td>
              <td>{grade.partial2}</td>
              <td>{grade.exam}</td>
              <td>{grade.average?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesPage;
