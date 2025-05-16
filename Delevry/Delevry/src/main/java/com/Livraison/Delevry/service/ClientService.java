package com.Livraison.Delevry.service;

import com.Livraison.Delevry.Request.Signup;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ClientService {

    ResponseEntity<String >signup(Signup requestMap);
    ResponseEntity<Map<String, Object>> login(Map<String,String> requestMap);
}
