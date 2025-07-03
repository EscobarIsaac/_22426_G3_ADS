package view;
import controller.EstudianteController;
import model.Estudiante;
 //Vista principal: prueba del CRUD desde consola.
public class main {
    public static void main(String[] args) {
        EstudianteController controller = new EstudianteController();
//anade a los estudiantes
        controller.crearEstudiante(1, "Pérez", "Ana", 20);
        controller.crearEstudiante(2, "García", "Luis", 22);

        System.out.println(" Estudiantes registrados:");
        for (Estudiante e : controller.obtenerTodos()) {
            System.out.println(e);
        }
//imprime las funciones llamadas del controller
        System.out.println("\n Editando estudiante con ID 2...");
        controller.actualizarEstudiante(2, "García", "Luis Alberto", 23);

        System.out.println("\n Eliminando estudiante con ID 1...");
        controller.eliminarEstudiante(1);

        System.out.println("\n Listado final:");
        for (Estudiante e : controller.obtenerTodos()) {
            System.out.println(e);
        }
    }
}
