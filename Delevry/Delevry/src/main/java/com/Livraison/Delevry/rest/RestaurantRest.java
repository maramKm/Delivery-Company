package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/restaurant")
public interface RestaurantRest {
    @GetMapping(path = "/GetRestau")
    ResponseEntity<List<RestaurantDTO>> getRestauTrue();

    @PutMapping("/{restauId}/changerStatut")
    ResponseEntity<String> changerStatut(@PathVariable Long restauId,
                                         @RequestBody Map<String, Boolean> request);

}
