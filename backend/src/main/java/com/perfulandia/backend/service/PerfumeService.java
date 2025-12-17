package com.perfulandia.backend.service;


import  com.perfulandia.backend.model.Perfume;
import  com.perfulandia.backend.repository.PerfumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;

    public PerfumeService(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }

    public Perfume crearPerfume(Perfume perfume) {
        return perfumeRepository.save(perfume);
    }
    // Método para eliminar por ID
    public void eliminarPerfume(Long id) {
        perfumeRepository.deleteById(id);
    }
    public List<Perfume> listarPerfumes() {
        return perfumeRepository.findAll();
    }
}
