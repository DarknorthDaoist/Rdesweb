package cl.redesUsach.redes.services;


import cl.redesUsach.redes.models.Signal;
import cl.redesUsach.redes.repositories.SignalRepository;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    
    @GetMapping("/fecha")
    public Map<String, Object> getSignalsByDate() throws JSONException, ParseException{
    	
		Calendar cal= Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		Date actual=cal.getTime();
		
	    cal.add(Calendar.DAY_OF_YEAR, -30);
	    cal.set(Calendar.HOUR_OF_DAY, 23);
	    cal.set(Calendar.MINUTE,59);
	    cal.set(Calendar.SECOND,59);
	    Date anterior=cal.getTime();
	   
       List<Signal> signals=signalRepository.findAll();
       List<Signal> signalsFecha=new ArrayList<Signal>();
       List<Signal> signalMañana=new ArrayList<Signal>();
       List<Signal> signalTarde=new ArrayList<Signal>();
       List<Signal> signalNoche=new ArrayList<Signal>();
        
         for(Signal signal : signals) {
        	 
        	if(signal.getFecha().after(anterior) && signal.getFecha().before(actual)) {
        		signalsFecha.add(signal);
        	}
		}
         
        for(Signal signal : signalsFecha) {
        	
        	cal.setTime(signal.getFecha());
        	int hour=cal.get(Calendar.HOUR_OF_DAY);
        	
        	if(hour>=6 && hour<=12) {
        		
        		signalMañana.add(signal);
        	}
        	else if(hour>12 && hour <=18) {
        		
        		signalTarde.add(signal);
        	}
        	else{
        		signalNoche.add(signal);
        	}
		}
        
        Map<String, Object> body = new HashMap<String, Object>();
        body.put("mañana", signalMañana);
        body.put("tarde", signalTarde);
        body.put("noche", signalNoche);
        return body;
    }

    @PostMapping("/fechas")
    public Map<String, Object> getSignalsByIntervalo(@RequestBody String json) throws JSONException, ParseException, CloneNotSupportedException {

        JSONObject response = new JSONObject(json);
        String inicio= response.getString("fechaInicio");
        String termino= response.getString("fechaTermino");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date fechaInicio =df.parse(inicio);
        Date fechaTermino=df.parse(termino);
        System.out.println(fechaInicio+"----"+fechaTermino);
        Calendar cal= Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        Date actual=cal.getTime();

        cal.add(Calendar.DAY_OF_YEAR, -30);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE,59);
        cal.set(Calendar.SECOND,59);
        Date anterior=cal.getTime();
        // falta definir las fechas
        List<Signal> signals=signalRepository.findAll();
        List<Signal> signalsFecha=new ArrayList<Signal>();
        ArrayList<Signal> signalMañana=new ArrayList<Signal>();
        ArrayList<Signal> signalTarde=new ArrayList<Signal>();
        ArrayList<Signal> signalNoche=new ArrayList<Signal>();


        for(Signal signal : signals) {
            Date fechaAdaptada=df.parse(df.format(signal.getFecha()));
            System.out.println(fechaAdaptada);
            System.out.println("*****"+signal.getFecha().compareTo(fechaInicio));
            System.out.println("****"+signal.getFecha().compareTo(fechaTermino));

            if((fechaAdaptada.compareTo(fechaInicio)==0  || fechaAdaptada.compareTo(fechaInicio)==1) &&
                    (fechaAdaptada.compareTo(fechaTermino)==0  || fechaAdaptada.compareTo(fechaTermino)==-1) ){
                signalsFecha.add(signal);
                System.out.println("****************agregando****************************");
            }
        }

        for(Signal signal : signalsFecha) {

            cal.setTime(signal.getFecha());
            int hour=cal.get(Calendar.HOUR_OF_DAY);

            if(hour>=6 && hour<=12) {

                signalMañana.add(signal);
                System.out.println("agregando en mañana");
            }
            else if(hour>12 && hour <=18) {

                signalTarde.add(signal);
                System.out.println("agregando en tarde");
            }
            else{
                signalNoche.add(signal);
                System.out.println("agregando en noche");
            }
        }

        signalMañana=Signal.promediar(signalMañana);
//        signalMañana=Signal.asignarPesoClon(signalMañana);

        signalTarde=Signal.promediar(signalTarde);
//        signalTarde=Signal.asignarPesoClon(signalTarde);

        signalNoche=Signal.promediar(signalNoche);
//        signalNoche=Signal.asignarPesoClon(signalNoche);

        Map<String, Object> body = new HashMap<String, Object>();
        body.put("mañana", signalMañana);
        body.put("tarde", signalTarde);
        body.put("noche", signalNoche);
        return body;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Signal create(@RequestBody Signal resource) {
    	System.out.println(resource.getFecha());	
        return signalRepository.save(resource);
    }
    
   


}

