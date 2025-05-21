package com.Livraison.Delevry.service;

import com.Livraison.Delevry.wrapper.LivraisonDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LivraiosnService {
    ResponseEntity<List<LivraisonDTO>> getAlllivraison();
}
