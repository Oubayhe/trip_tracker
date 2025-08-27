package com.backend.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.models.GpsCoordinates;
import com.backend.backend.services.GpsCoordinatesService;


@RestController
@RequestMapping("/api/gps")
public class GpsController {

    private final GpsCoordinatesService gpsCoordinatesService;

    public GpsController(GpsCoordinatesService gpsCoordinatesService) {
        this.gpsCoordinatesService = gpsCoordinatesService;
    }

    @GetMapping("")
    public List<GpsCoordinates> getCoordinates() {
        return gpsCoordinatesService.getAllCoordinates();
    }
    
}
