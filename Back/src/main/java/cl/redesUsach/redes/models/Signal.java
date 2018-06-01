package cl.redesUsach.redes.models;

import org.springframework.data.annotation.Id;

public class Signal {
    @Id
    private String id;
    private String latitud;
    private String longitud;

    public String getId() {
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
}
