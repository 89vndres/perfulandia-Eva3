package com.perfulandia.backend.model;

import jakarta.persistence.*;
import lombok.Data; // Si usas Lombok, si no, genera Getters/Setters

@Entity
@Data
public class Perfume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String marca;
    private Double precio;
    private String imagen;
    private String category;
    private String aroma;
    private Integer stock;
}