package cl.redesUsach.redes.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;

@Document(collection="datos")
public class Signal implements Cloneable {
    @Id
    private String id;
    private String latitud;
    private String longitud;
   
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm",timezone="GMT-4")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date fecha;
    
    private String estado;

    private String velocidad;
    private String intensidad;


    public Signal clone() throws CloneNotSupportedException{
        Signal clon = (Signal) super.clone();
        return clon;
    }

    public String  getId() {
        return id;
    }

    public String getLatitud() {
        return latitud;
    }

    public String getLongitud() {
        return longitud;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIntensidad(String intensidad) {
        this.intensidad = intensidad;
    }

    public String getIntensidad() {
        return intensidad;
    }

    public String getVelocidad() {
        return velocidad;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setVelocidad(String velocidad) {
        this.velocidad = velocidad;
    }

    public String getEstado() {
		return estado;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public static  ArrayList<Signal> promediar(ArrayList<Signal> coordenadas){

        ArrayList<Signal> promediados= new ArrayList<Signal>();
        for (int i=0;i<coordenadas.size();i++) {

            int contador=1;
            double acumulador= Double.parseDouble(coordenadas.get(i).getIntensidad());
            for (int j=i+1; j<coordenadas.size();j++) {
                if(coordenadas.get(i).getLatitud().equals(coordenadas.get(j).getLatitud()) &&
                        coordenadas.get(i).getLongitud().equals(coordenadas.get(j).getLongitud())) {
                   acumulador+=Double.parseDouble(coordenadas.get(j).getVelocidad());
                   coordenadas.remove(j);
                   contador++;
                }

            }
            double promedio=acumulador/contador;
            String estado="UNKNOWN";
            if(promedio<150){
                estado="POOR";
            }
            else if(promedio>=150 && promedio<550){
                estado="MODERATE";
            }
            else if(promedio>=550 && promedio< 2000){
                estado="GOOD";
            }
            else if(promedio>=2000){
                estado="EXCELLENT";
            }
            coordenadas.get(i).setVelocidad(String.valueOf(promedio));
            coordenadas.get(i).setEstado(estado);
            promediados.add(coordenadas.get(i));


        }
        return promediados;

    }

    public static ArrayList<Signal> asignarPesoClon(ArrayList<Signal> coordenadas) throws CloneNotSupportedException {
        ArrayList<Signal> clonados= new ArrayList<Signal>();
        for (Signal coord: coordenadas) {
            int repeticion=0;
            if(coord.getEstado().equals("POOR")){
                repeticion=2;
            }
            else if(coord.getEstado().equals("MODERATE")){
                repeticion=3;
            }
            else if(coord.getEstado().equals("GOOD")){
                repeticion=4;
            }
            else if(coord.getEstado().equals("EXCELLENT")){
                repeticion=6;
            }
           else{
                repeticion=1;
            }

            for(int i=0;i<repeticion;i++){
                clonados.add(coord.clone());
            }
            
        }
        return clonados;



    }

	
    
    
}
