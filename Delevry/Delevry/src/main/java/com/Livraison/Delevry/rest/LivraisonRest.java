package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import com.Livraison.Delevry.wrapper.LivreurDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/livraison")
public interface LivraisonRest {
    @GetMapping("/commandes-preparees")
    ResponseEntity<List<CommandeDTO>> getCommandesPreparees();

    @GetMapping("/livreurs-disponibles")
    ResponseEntity<List<LivreurDTO>> getLivreursDisponibles();

    @PostMapping("/affecter")
    ResponseEntity<String> affecterLivreur(@RequestBody Map<String, Long> payload);

    @GetMapping("/livreur/{livreurId}")
    ResponseEntity<List<LivraisonDTO>> getLivraisonsLivreur(@PathVariable Long livreurId);


    @PostMapping("/accepter")
    ResponseEntity<String> accepterLivraison(@RequestBody Map<String, Long> payload);

    @PostMapping("/marquer-livree/{livraisonId}")
    ResponseEntity<String> marquerCommeLivree(@PathVariable Long livraisonId);

    @PostMapping("/confirmer/{livraisonId}")
    ResponseEntity<String> confirmerLivraison(@PathVariable Long livraisonId);

    @GetMapping("/client/{clientId}")
    ResponseEntity<List<LivraisonDTO>> getLivraisonsClient(@PathVariable Long clientId);

}
