package com.Livraison.Delevry.pojo;

import jakarta.persistence.Embeddable;

import java.io.Serializable;


@Embeddable
public class Position implements Serializable {
    private Double latitude;
    private Double longitude;

    public Position(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
