package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.Request.CommandeModif;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.rest.CommandeRest;
import com.Livraison.Delevry.service.CommandeService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CommandeRestImpl implements CommandeRest {

    @Autowired
    CommandeService commandeService;


    @Override
    public ResponseEntity<Map<String, String>> AddCommande(Map<String, Object> requestMap) {
        try {
            return commandeService.AddCommande(requestMap);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Something went wrong");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<String> changerStatut(Long commandeId) {
        try {
            return commandeService.changerStatutCommande(commandeId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> assignerLivreur(Long commandeId) {
        try {
            return commandeService.assignerLivreurEtChangerStatut(commandeId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> anuulerCommande(Long commandeId) {
        try {
            return commandeService.annulerCommande(commandeId);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Erreur lors de l'annulation de la commande", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> modifierCommande(Long commandeId, CommandeModif request) {
        try{
            return commandeService.modifierCommande(commandeId,request);
        } catch (Exception e) {
            e.printStackTrace();;
        }
        return new ResponseEntity<>("Erreur lors de la modification de la commande", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @Override
    public ResponseEntity<List<CommandeDTO>> getAllCommande() {
        try {
            return commandeService.GetAllCommande(); // Assure-toi que la méthode du service retourne une liste de CommandeDTO
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<List<CommandeDTO>> getAllCommandeByRestaurant(Long restaurantId) {
        try {
            return commandeService.getAllCommandeByRestaurant(restaurantId);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByClient(Long IdClient) {
        try {
            return commandeService.getCommandesByClient(IdClient);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByLivreur(Long livreurId) {
        try {
            return commandeService.getCommandesByLivreur(livreurId);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByStatut(String statut) {
        try {
            return commandeService.getCommandesByStatut(statut);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<CommandeDTO> getCommandeDetails(Long commandeId) {
        try {
            return commandeService.getCommandeDetails(commandeId);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> changerStatutPrete(Long commandeId) {
        try {
            return commandeService.changerStatutPrete(commandeId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
