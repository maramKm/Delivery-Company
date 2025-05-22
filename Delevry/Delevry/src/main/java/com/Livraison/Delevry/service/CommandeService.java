package com.Livraison.Delevry.service;

import com.Livraison.Delevry.Request.CommandeModif;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CommandeService {
    ResponseEntity<Map<String, String>> AddCommande(Map<String, Object> requestMap);
    ResponseEntity<String>changerStatutCommande(Long id );

    ResponseEntity<String>annulerCommande(Long commandeId);
    ResponseEntity<String>modifierCommande(Long commandeId, CommandeModif request);
    ResponseEntity<List<CommandeDTO>> GetAllCommande();
    ResponseEntity<List<CommandeDTO>> getAllCommandeByRestaurant(Long restaurantId);
    ResponseEntity<List<CommandeDTO>>getCommandesByClient(Long IdClient);
    ResponseEntity<List<CommandeDTO>> getCommandesByLivreur(Long livreurId);
    ResponseEntity<List<CommandeDTO>>getCommandesByStatut(String statut);
    ResponseEntity<CommandeDTO> getCommandeDetails( Long commandeId);
    ResponseEntity<String>changerStatutPrete(Long commandeId);
}
