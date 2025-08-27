package com.backend.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.IdClass;
import lombok.Data;

@Data
@Entity
@Table(name = "arch_1004901")
@IdClass(GpsCoordinatesId.class)
public class GpsCoordinates {

    @Id
    @Column(name = "date")
    private LocalDateTime date;

    @Id
    @Column(name = "id_device")
    private int idDevice;

    @Column(name = "speed")
    private int speed;

    @Column(name = "fuel")
    private int fuel;

    @Column(name = "temp")
    private String temp;

    @Column(name = "X")
    private int x;

    @Column(name = "Y")
    private int y;

    @Column(name = "Z")
    private int z;

    @Column(name = "ignition")
    private boolean ignition;

    @Column(name = "rpm")
    private Integer rpm = 0;

    @Column(name = "fuel_rate")
    private Double fuelRate = 0.0;

    @Column(name = "tfu")
    private Double tfu = 0.0;

    @Column(name = "odo")
    private Double odo = 0.0;

    @Column(name = "SatInView")
    private Integer satInView = 0;

    @Column(name = "signal")
    private Integer signal = 0;

    @Column(name = "heading")
    private int heading;

    @Column(name = "charger")
    private boolean charger;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "tram_id")
    private Integer tramId;

    @Column(name = "validity")
    private Boolean validity;

    @Column(name = "temp_engine")
    private Integer tempEngine;

    @Column(name = "accum_odo")
    private Float accumOdo;

    @Column(name = "do1")
    private Integer do1;

    @Column(name = "do2")
    private Integer do2;

    @Column(name = "do3")
    private Integer do3;

    @Column(name = "do4")
    private Integer do4;

    @Column(name = "di1")
    private Integer di1;

    @Column(name = "di2")
    private Integer di2;

    @Column(name = "di3")
    private Integer di3;

    @Column(name = "di4")
    private Integer di4;

    @Column(name = "an1")
    private Integer an1;

    @Column(name = "an2")
    private Integer an2;

    @Column(name = "an3")
    private Integer an3;

    @Column(name = "an4")
    private Integer an4;

    public GpsCoordinates() {
    }
}
