package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.pojo.Restaurant;
import com.Livraison.Delevry.rest.LivraisonRest;
import com.Livraison.Delevry.service.LivraiosnService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import com.Livraison.Delevry.wrapper.LivreurDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class LivraisonRestImpl implements LivraisonRest {
    @Autowired
    LivraiosnService livraiosnService;

    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesPreparees() {
        List<CommandeDTO> commandes = livraiosnService.getCommandesPreparees();
        return new ResponseEntity<>(commandes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<LivreurDTO>> getLivreursDisponibles() {
        List<LivreurDTO> livreurs = livraiosnService.getLivreursDisponibles();
        return ResponseEntity.ok(livreurs);
    }

    @Override
    public ResponseEntity<String> affecterLivreur(Map<String, Long> payload) {
        Long commandeId = payload.get("commandeId");
        Long livreurId = payload.get("livreurId");
        if (commandeId == null || livreurId == null) {
            return new ResponseEntity<>("ID de commande ou de livreur manquant", HttpStatus.BAD_REQUEST);
        }

        boolean success = livraiosnService.affecterLivreur(commandeId, livreurId);

        if (success) {
            return new ResponseEntity<>("Livreur affecté avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Échec de l'affectation du livreur", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<LivraisonDTO>> getLivraisonsLivreur(Long livreurId) {
        List<LivraisonDTO> livraisons = livraiosnService.getLivraisonsLivreur(livreurId);
        return new ResponseEntity<>(livraisons, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> accepterLivraison(Map<String, Long> payload) {
        Long livraisonId = payload.get("livraisonId");
        Long livreurId = payload.get("livreurId");

        if (livraisonId == null || livreurId == null) {
            return new ResponseEntity<>("ID de livraison ou de livreur manquant", HttpStatus.BAD_REQUEST);
        }

        boolean success = livraiosnService.accepterLivraison(livraisonId, livreurId);

        if (success) {
            return new ResponseEntity<>("Livraison acceptée avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Échec de l'acceptation de la livraison", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> marquerCommeLivree(Long livraisonId) {
        boolean success = livraiosnService.marquerCommeLivree(livraisonId);

        if (success) {
            return new ResponseEntity<>("Livraison marquée comme livrée avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Échec du marquage de la livraison", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> confirmerLivraison(Long livraisonId) {
        boolean success = livraiosnService.confirmerLivraison(livraisonId);

        if (success) {
            return new ResponseEntity<>("Livraison confirmée avec succès", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Échec de la confirmation de la livraison", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<LivraisonDTO>> getLivraisonsClient(Long clientId) {
        List<LivraisonDTO> livraisons = livraiosnService.getLivraisonsClient(clientId);
        return new ResponseEntity<>(livraisons, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<LivreurDTO>> getAllLivreurs() {
        List<LivreurDTO> list = livraiosnService.getAllLivreurs();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<List<LivraisonDTO>> getAllLivraisons() {
        List<LivraisonDTO> list = livraiosnService.getAllLivraisons();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<List<LivraisonDTO>> getAllLivraisonsByRestaurant(Long restaurantId) {
        try {
            List<LivraisonDTO> livraisons = livraiosnService.getAllLivraisonsByRestaurant(restaurantId);
            return ResponseEntity.ok(livraisons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
        }
    }
}
