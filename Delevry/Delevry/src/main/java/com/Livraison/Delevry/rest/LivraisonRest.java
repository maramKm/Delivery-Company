package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping(path = "/livraison")
public interface LivraisonRest {
    @GetMapping(path = "/getlivraison")
    ResponseEntity<List<LivraisonDTO>> getAlllivraison();
}
