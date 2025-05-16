package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.rest.DashbordRest;
import com.Livraison.Delevry.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashbordRestImpl implements DashbordRest {
    @Autowired
    DashboardService dashboardService;
    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        try {
            return dashboardService.getCount();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
