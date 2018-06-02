package cl.redesUsach.redes.repositories;

import cl.redesUsach.redes.models.Signal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public interface SignalRepository extends MongoRepository<Signal,String> {

    List<Signal> findAllByFecha(Date fecha);

}
