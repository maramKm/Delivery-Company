package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.dao.LivraisonDao;
import com.Livraison.Delevry.dao.LivreurDao;
import com.Livraison.Delevry.dao.RestaurantDao;
import com.Livraison.Delevry.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class DashboardServiceIImpl implements DashboardService {
    @Autowired
    RestaurantDao restaurantDao;
    @Autowired
    LivreurDao livreurDao;
    @Autowired
    LivraisonDao livraisonDao;

    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        try{
            Map<String,Object> map=new HashMap<>();
            map.put("Livreur",livreurDao.count());
            map.put("Restaurant",restaurantDao.count());
            map.put("Livraison",livraisonDao.count());
            return ResponseEntity.ok(map);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            log.error("Error while fetching counts: ", e);

            // Return an error response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "An error occurred while fetching counts.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
