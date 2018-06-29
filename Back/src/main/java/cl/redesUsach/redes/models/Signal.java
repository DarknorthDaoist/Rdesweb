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
    private String latitud;
    private String longitud;
   
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm",timezone="GMT-4")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date fecha;
    
    private String estado;

    private String velocidad;
    private String intensidad;


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

    public String getIntensidad() {
        return intensidad;
    }

    public String getVelocidad() {
        return velocidad;
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

	
    
    
}
