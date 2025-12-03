package com.perfulandia.backend.controller;

import com.perfulandia.backend.model.Perfume;
import com.perfulandia.backend.repository.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfume")
@CrossOrigin(origins = "http://localhost:3000")
public class PerfumeController {

    @Autowired
    private PerfumeRepository perfumeRepository;

    @GetMapping
    public List<Perfume> getAll() {
        return perfumeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Perfume getById(@PathVariable Long id) {
        return perfumeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Perfume create(@RequestBody Perfume perfume) {
        return perfumeRepository.save(perfume);
    }

    @PutMapping("/{id}")
    public Perfume update(@PathVariable Long id, @RequestBody Perfume perfumeDetails) {
        return perfumeRepository.findById(id).map(perfume -> {
            perfume.setNombre(perfumeDetails.getNombre());
            perfume.setMarca(perfumeDetails.getMarca());
            perfume.setPrecio(perfumeDetails.getPrecio());
            perfume.setImagen(perfumeDetails.getImagen());
            perfume.setCategory(perfumeDetails.getCategory());
            perfume.setAroma(perfumeDetails.getAroma());
            perfume.setStock(perfumeDetails.getStock());
            return perfumeRepository.save(perfume);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        perfumeRepository.deleteById(id);
    }
}