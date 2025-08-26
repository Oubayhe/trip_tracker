package com.backend.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/gps")
public class GpsController {

    @GetMapping("/get")
    public String getCoordinates() {
        return new String("Hello, how are you?");
    }
    
}
