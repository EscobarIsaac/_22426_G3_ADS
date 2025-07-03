package controller;
//llama a estudiantesDao para almacenarlos en una lista y realizar las operaciones en la lista
import dao.EstudianteDAO;
import model.Estudiante;
import java.util.List;
//Clase Controladora: dirige la lógica de negocio entre Vista y DAO.
public class EstudianteController {
    private final EstudianteDAO dao = new EstudianteDAO();

    // Crear un nuevo estudiante
    public void crearEstudiante(int id, String apellidos, String nombres, int edad) {
        Estudiante estudiante = new Estudiante(id, apellidos, nombres, edad);
        dao.agregar(estudiante);
    }

    // Obtener todos los estudiantes
    public List<Estudiante> obtenerTodos() {
        return dao.listar();
    }

    // Buscar estudiante por ID
    public Estudiante buscarEstudiante(int id) {
        return dao.buscarPorId(id);
    }

    // Actualizar estudiante existente
    public boolean actualizarEstudiante(int id, String apellidos, String nombres, int edad) {
        Estudiante actualizado = new Estudiante(id, apellidos, nombres, edad);
        return dao.editar(actualizado);
    }

    // Eliminar estudiante por ID
    public boolean eliminarEstudiante(int id) {
        return dao.eliminar(id);
    }
}
