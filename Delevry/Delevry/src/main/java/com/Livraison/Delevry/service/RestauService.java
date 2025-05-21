package com.Livraison.Delevry.service;

import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface RestauService {
    ResponseEntity<List<RestaurantDTO>> getRestauTrue();

    ResponseEntity<String> changerStatut(Long restauId, Map<String, Boolean> request);
}
