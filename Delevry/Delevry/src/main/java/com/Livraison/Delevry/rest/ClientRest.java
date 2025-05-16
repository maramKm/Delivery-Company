package com.Livraison.Delevry.rest;


import com.Livraison.Delevry.Request.Signup;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping(path="/user")
public interface ClientRest {
    @PostMapping(path= "/signup")
    public ResponseEntity<String> signup( @RequestBody Signup request);

    @PostMapping(path= "/login")
    public ResponseEntity<Map<String, Object>> login (@RequestBody(required = true) Map<String, String> requestMap);
}
