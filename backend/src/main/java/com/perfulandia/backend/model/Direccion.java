package com.perfulandia.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuarioEmail; // Para vincular con el usuario
    private String alias; //  "Casa", "Oficina"
    private String direccion;
    private String ciudad;
    private boolean predeterminada;
}