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
    private double weight;

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

    public double getWeight(){
        return weight;
    }
    public void setWeight(double weight){
        this.weight=weight;
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
            if(coordenadas.get(i) != null){

                System.out.println("**coordenadas:"+coordenadas.get(i).getLatitud()+","+coordenadas.get(i).longitud);
                int contador=1;
                double acumulador= Double.parseDouble(coordenadas.get(i).getVelocidad());
                for (int j=i+1; j<coordenadas.size();j++) {
                    if( coordenadas.get(j) != null && coordenadas.get(i).getLatitud().equals(coordenadas.get(j).getLatitud()) &&
                            coordenadas.get(i).getLongitud().equals(coordenadas.get(j).getLongitud())) {
                        acumulador+=Double.parseDouble(coordenadas.get(j).getVelocidad());
                        coordenadas.set(j,null);
                        contador++;
                    }


                }
                double promedio=acumulador/contador;
                System.out.println("**promedio es:"+ promedio);
                System.out.println("**contador es:"+contador);
                String estado="UNKNOWN";
                double peso=0.0;

                if(promedio<150){
                    estado="POOR";
                    peso=0.2;
                }
                else if(promedio>=150 && promedio<550){
                    estado="MODERATE";
                    peso=0.5;

                }
                else if(promedio>=550 && promedio< 2000){
                    estado="GOOD";
                    peso=1;
                }
                else if(promedio>=2000){
                    estado="EXCELLENT";
                    peso=3;
                }
                System.out.println("**es:"+estado);
                coordenadas.get(i).setVelocidad(String.valueOf(promedio));
                coordenadas.get(i).setEstado(estado);
                coordenadas.get(i).setWeight(peso);
                promediados.add(coordenadas.get(i));
            }

        }
        return promediados;

    }

//    public static ArrayList<Signal> asignarPesoClon(ArrayList<Signal> coordenadas) throws CloneNotSupportedException {
//        ArrayList<Signal> clonados= new ArrayList<Signal>();
//        for (Signal coord: coordenadas) {
//            int repeticion=1;
//            if(coord.getEstado().equals("POOR")){
//                coord.setWeight(0.2);
//                //repeticion=2;
//            }
//            else if(coord.getEstado().equals("MODERATE")){
//                coord.setWeight(0.5);
//                //repeticion=8;
//            }
//            else if(coord.getEstado().equals("GOOD")){
//                coord.setWeight(1);
//                //repeticion=14;
//            }
//            else if(coord.getEstado().equals("EXCELLENT")){
//                coord.setWeight(3);
//                //repeticion=36;
//            }
//            else{
//                repeticion=1;
//            }
//            System.out.println("**repeticion:"+repeticion);
//            for(int i=0;i<repeticion;i++){
//                clonados.add(coord.clone());
//            }
//
//        }
//        return clonados;
//
//
//
//    }




}