package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.rest.LivraisonRest;
import com.Livraison.Delevry.service.LivraiosnService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
@Controller
public class LivraisonRestImpl implements LivraisonRest {
    @Autowired
    LivraiosnService livraiosnService;
    @Override
    public ResponseEntity<List<LivraisonDTO>> getAlllivraison() {
        try {
            return livraiosnService.getAlllivraison();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
