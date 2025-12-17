package com.perfulandia.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "perfume")
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String marca;
    private Double precio;

    // CORRECCIÓN IMPORTANTE: Aumentamos el límite de caracteres para la URL
    @Column(length = 1000) 
    private String imagen;

    // Cambiamos el nombre en la DB a 'categoria' para evitar conflictos con palabras reservadas
    @Column(name = "categoria")
    private String category;

    private String aroma;
    private Integer stock;

    // Constructor vacío (Obligatorio para JPA)
    public Perfume() {
    }

    // Constructor con campos
    public Perfume(String nombre, String marca, Double precio, String imagen, String category, String aroma, Integer stock) {
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.imagen = imagen;
        this.category = category;
        this.aroma = aroma;
        this.stock = stock;
    }

    // === GETTERS Y SETTERS MANUALES ===
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAroma() {
        return aroma;
    }

    public void setAroma(String aroma) {
        this.aroma = aroma;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}