package com.backend.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.models.GpsCoordinates;
import com.backend.backend.models.GpsCoordinatesId;

public interface GpsCoordinatesRepository extends JpaRepository<GpsCoordinates, GpsCoordinatesId> {

}
