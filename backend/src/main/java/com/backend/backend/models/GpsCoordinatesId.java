package com.backend.backend.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class GpsCoordinatesId implements Serializable {
    private LocalDateTime date;
    private int idDevice;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GpsCoordinatesId)) return false;
        GpsCoordinatesId that = (GpsCoordinatesId) o;
        return idDevice == that.idDevice &&
               Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, idDevice);
    }
}

