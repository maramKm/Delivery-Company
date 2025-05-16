package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(path = "/restaurant")
public interface RestaurantRest {
    @GetMapping(path = "/GetRestau")
    ResponseEntity<List<RestaurantDTO>> getRestauTrue();

}
