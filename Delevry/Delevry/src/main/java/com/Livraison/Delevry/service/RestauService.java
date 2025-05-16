package com.Livraison.Delevry.service;

import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestauService {
    ResponseEntity<List<RestaurantDTO>> getRestauTrue();
}
