package cl.redesUsach.redes.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection="datos")
public class Signal {
    @Id
    private String id;
    private Double latitud;
    private Double longitud;
   
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date fecha;
    
    private String estado;

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

	public String getEstado() {
		return estado;
	}

    
    
}
