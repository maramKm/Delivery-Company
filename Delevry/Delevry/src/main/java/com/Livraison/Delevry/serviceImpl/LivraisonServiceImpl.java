package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.service.LivraiosnService;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LivraisonServiceImpl implements LivraiosnService {
    @Override
    public ResponseEntity<List<LivraisonDTO>> getAlllivraison() {
        try {

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
