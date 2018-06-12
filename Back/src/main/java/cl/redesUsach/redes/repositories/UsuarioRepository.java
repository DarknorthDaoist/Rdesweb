package cl.redesUsach.redes.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import cl.redesUsach.redes.models.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario,Long> {
	
	 Optional<Usuario> findByEmail(String email);

}
