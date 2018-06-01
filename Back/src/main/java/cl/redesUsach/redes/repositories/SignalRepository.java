package cl.redesUsach.redes.repositories;

import cl.redesUsach.redes.models.Signal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SignalRepository extends MongoRepository<Signal,String> {

}
