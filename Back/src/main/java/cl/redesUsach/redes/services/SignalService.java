package cl.redesUsach.redes.services;


import cl.redesUsach.redes.models.Signal;
import cl.redesUsach.redes.repositories.SignalRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @GetMapping("/{calidad}")
    public Iterable<Signal> getEspecificSignal(@PathVariable("calidad") String calidad){
    	Iterable<Signal> señales= signalRepository.findAll();
        List<Signal> seleccionadas= new ArrayList<Signal>();
        for (Signal señal: señales) {
            if(señal.getEstado()!=null && señal.getEstado().equals(calidad)){
                seleccionadas.add(señal);
            }
        }
        return seleccionadas;
    }
/*
    @RequestMapping(value= "/fecha/{fecha}",method = RequestMethod.GET)
    @ResponseBody
    public String getSignalsByDate(@PathVariable("fecha") String fecha ){
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyy HH:mm");
        try{
            Date temp=formatter.parse(fecha);
            return signalRepository.findAllByFecha(temp).toString();
        }catch(ParseException e){
            return "Error "+fecha;
        }

    }*/

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Signal create(@RequestBody Signal resource) {
        return signalRepository.save(resource);
    }
    
   


}

