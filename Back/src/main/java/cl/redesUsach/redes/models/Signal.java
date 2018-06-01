package cl.redesUsach.redes.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;

import java.util.Date;

public class Signal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private Double latitud;
    private Double longitud;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date fecha;

    private Double velocidad;
    private Double intensidad;


    public String  getId() {
        return id;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getIntensidad() {
        return intensidad;
    }

    public Double getVelocidad() {
        return velocidad;
    }
}
