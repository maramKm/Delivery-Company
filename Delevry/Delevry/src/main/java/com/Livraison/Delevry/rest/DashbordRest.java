package com.Livraison.Delevry.rest;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path = "/dashboard")
public interface DashbordRest {

    @GetMapping(path="/details")
    ResponseEntity<Map<String,Object>> getCount();
}
