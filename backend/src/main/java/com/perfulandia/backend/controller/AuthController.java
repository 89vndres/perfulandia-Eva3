package com.perfulandia.backend.controller;

import com.perfulandia.backend.dto.LoginRequest;
import com.perfulandia.backend.dto.LoginResponse;
import com.perfulandia.backend.model.Usuario;
import com.perfulandia.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // --- LOGIN CON BASE DE DATOS ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
       
        Optional<Usuario> userOpt = usuarioRepository.findByEmail(request.getEmail());

        
        if (userOpt.isPresent()) {
            Usuario usuario = userOpt.get();

            if (usuario.getPassword().equals(request.getPassword())) {
                // ¡LOGIN EXITOSO!
                LoginResponse response = new LoginResponse();
                response.setToken("TOKEN_REAL_" + usuario.getId()); 

                LoginResponse.UserDto userDto = new LoginResponse.UserDto();
                userDto.setEmail(usuario.getEmail());
                userDto.setRole(usuario.getRole()); 

                response.setUser(userDto);
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }

    // --- REGISTRO DE USUARIOS ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String nombre = request.get("nombre");

        // 1. Verificar si ya existe
        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("El correo ya está registrado");
        }

        // 2. Crear nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setPassword(password);
        nuevoUsuario.setNombre(nombre);


        if (email.contains("admin")) {
            nuevoUsuario.setRole("admin");
        } else {
            nuevoUsuario.setRole("user");
        }

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok("Usuario registrado con éxito");
    }
}