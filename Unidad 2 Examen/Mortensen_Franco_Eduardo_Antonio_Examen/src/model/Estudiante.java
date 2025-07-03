package model;


 // Modelo que representa a un estudiante por lo tanto creamos la clase estudiante.

public class Estudiante {
    private int id;
    private String apellidos;
    private String nombres;
    private int edad;

    public Estudiante(int id, String apellidos, String nombres, int edad) {
        this.id = id;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.edad = edad;
    }
// Getters
    public int getId() { return id; }
    public String getApellidos() { return apellidos; }
    public String getNombres() { return nombres; }
    public int getEdad() { return edad; }
//setters
    public void setId(int id) { this.id = id; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public void setEdad(int edad) { this.edad = edad; }
//constructor
//id identificador unico estudiante
//nombre nombre del estudiante
// edad edad del estudiante
    @Override
    public String toString() {
        return id + " - " + apellidos + " " + nombres + " - Edad: " + edad;
    }
}
