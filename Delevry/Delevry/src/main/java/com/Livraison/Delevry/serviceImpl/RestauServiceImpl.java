package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.dao.RestaurantDao;
import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.pojo.Restaurant;
import com.Livraison.Delevry.service.RestauService;
import com.Livraison.Delevry.wrapper.PlatDTO;
import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestauServiceImpl implements RestauService {
    @Autowired
    RestaurantDao restaurantDao;
    @Override
    public ResponseEntity<List<RestaurantDTO>> getRestauTrue() {
        try {
            List<Restaurant> restaurants = restaurantDao.findAllByStatusTrue();

            if (restaurants.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<RestaurantDTO> restaurantDTOS = restaurants.stream()
                    .map(RestaurantDTO::new) // Make sure RestaurantDTO has a constructor taking Restaurant
                    .collect(Collectors.toList());

            return new ResponseEntity<>(restaurantDTOS, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
