package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.Request.Signup;
import com.Livraison.Delevry.rest.ClientRest;
import com.Livraison.Delevry.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.Map;


@RestController
public class ClientRestImpl implements ClientRest {
    @Autowired
    ClientService clientService;

    @Override
    public ResponseEntity<String> signup(Signup requestMap) {
        try{
            return clientService.signup(requestMap);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Map<String, Object>> login(Map<String, String> requestMap) {
        try {
            return clientService.login(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Something went wrong");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
