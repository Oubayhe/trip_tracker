package com.backend.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.backend.models.GpsCoordinates;
import com.backend.backend.repositories.GpsCoordinatesRepository;

@Service
public class GpsCoordinatesService {
    private final GpsCoordinatesRepository gpsCoordinatesRepository;
    
    public GpsCoordinatesService(GpsCoordinatesRepository gpsCoordinatesRepository) {
        this.gpsCoordinatesRepository = gpsCoordinatesRepository;
    }

    public List<GpsCoordinates> getAllCoordinates() {
        return gpsCoordinatesRepository.findAll();
    }
}
