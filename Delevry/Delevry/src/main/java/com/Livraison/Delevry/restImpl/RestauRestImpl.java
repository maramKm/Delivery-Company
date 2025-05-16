package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.rest.RestaurantRest;
import com.Livraison.Delevry.service.RestauService;
import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestauRestImpl implements RestaurantRest {
    @Autowired
    RestauService restauService;
    @Override
    public ResponseEntity<List<RestaurantDTO>> getRestauTrue() {
        try {
            return restauService.getRestauTrue();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
