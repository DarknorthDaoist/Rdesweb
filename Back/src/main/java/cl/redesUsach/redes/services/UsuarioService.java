package cl.redesUsach.redes.services;


import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.redesUsach.redes.models.Usuario;
import cl.redesUsach.redes.repositories.UsuarioRepository;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Transactional
	@PostMapping
	public Usuario saveUsuario(@RequestBody Usuario usuario) {
		
		return usuarioRepository.save(usuario);
		
	}
	
	@Transactional
	@GetMapping("{id}")
	public Usuario findUsuarioByid(@PathVariable("id")Long id) {
		
		return usuarioRepository.findById(id).orElse(null);
	}
	
	@Transactional
	@DeleteMapping
	public HttpStatus deleteUsuario(@PathVariable("id")Long id) {
		
		usuarioRepository.deleteById(id);
		return HttpStatus.OK;
	}
	
	@Transactional
	@PutMapping("{id}")
	public HttpStatus updateUsuario(@PathVariable("id")Long id,@RequestBody Usuario usuario) {
		
		Usuario currentUsuario=usuarioRepository.findById(id).orElse(null);
		
		if(currentUsuario==null)return HttpStatus.NOT_ACCEPTABLE;
		
		currentUsuario.setApellido(usuario.getApellido());
		currentUsuario.setContraseña(usuario.getContraseña());
		currentUsuario.setNombre(usuario.getNombre());
		currentUsuario.setEmail(usuario.getEmail());
		
		return HttpStatus.OK;
		
	}
	
	
	@PostMapping("auth")
	@Transactional
	public Usuario auth(@RequestBody String json) throws JSONException {
		
		JSONObject response = new JSONObject(json);
		String email= response.getString("email");
		String contraseña=response.getString("contraseña");
		
		
		Usuario usuario=usuarioRepository.findByEmail(email).orElse(null);
		
		if(usuario==null || !usuario.getContraseña().equals(contraseña)) {
			return null;
		}
		
		return usuario;
	}
	
	

}
