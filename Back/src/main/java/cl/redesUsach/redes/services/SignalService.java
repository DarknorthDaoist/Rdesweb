package cl.redesUsach.redes.services;


import cl.redesUsach.redes.models.Signal;
import cl.redesUsach.redes.repositories.SignalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/signals")
public class SignalService {
    @Autowired
    SignalRepository signalRepository;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Signal> getAllSignals(){
        return signalRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Signal create(@RequestBody Signal resource) {
        return signalRepository.save(resource);
    }


}

