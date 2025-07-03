package dao;
import java.util.ArrayList;
import java.util.List;
import model.Estudiante;
//Clase encargada del almacenamiento de estudiantes en memoria.
//Almacena los Estudiantes en una Lista
public class EstudianteDAO {
    private List<Estudiante> estudiantes = new ArrayList<>();
    //Agrega los Estudiantes en una Lista
    public void agregar(Estudiante e) {
        estudiantes.add(e);
    }
    //Agregados los Estudiantes los enlista
    public List<Estudiante> listar() {
        return estudiantes;
    }
    //Busca a los Estudiantes por id en una Lista
    public Estudiante buscarPorId(int id) {
        for (Estudiante e : estudiantes) {
            if (e.getId() == id) return e;
        }
        return null;
    }
    //Edita a los Estudiantes  en la Lista
    public boolean editar(Estudiante nuevo) {
        for (int i = 0; i < estudiantes.size(); i++) {
            if (estudiantes.get(i).getId() == nuevo.getId()) {
                estudiantes.set(i, nuevo);
                return true;
            }
        }
        return false;
    }
    //Elimina a los Estudiantes  en la Lista
    public boolean eliminar(int id) {
        return estudiantes.removeIf(e -> e.getId() == id);
    }
}
