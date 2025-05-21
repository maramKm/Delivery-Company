package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.Request.CommandeModif;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/commande")
public interface CommandeRest {
    @PostMapping(path= "/add")
    ResponseEntity<Map<String, String>>AddCommande (@RequestBody(required = true) Map<String, Object> requestMap);
    @PutMapping("/{commandeId}/changerStatut")
    ResponseEntity<String> changerStatut(@PathVariable Long commandeId);
    @PutMapping("/{commandeId}/assignerLivreur")
    ResponseEntity<String> assignerLivreur(@PathVariable Long commandeId) ;
    @PutMapping(path = "/{commandeId}/annuler")
    ResponseEntity<String> anuulerCommande(@PathVariable Long commandeId);
    @PutMapping("/{commandeId}/modifier")
    public ResponseEntity<String> modifierCommande(@PathVariable Long commandeId, @RequestBody CommandeModif request);
    @GetMapping(path = "/getComm")
    ResponseEntity<List<CommandeDTO>> getAllCommande();

    @GetMapping("/restaurant/{restaurantId}")
    ResponseEntity<List<CommandeDTO>> getAllCommandeByRestaurant(@PathVariable Long restaurantId);

    @GetMapping(path = "/client/{IdClient}")
    ResponseEntity<List<CommandeDTO>> getCommandesByClient(@PathVariable Long IdClient);

    @GetMapping("/livreur/{livreurId}")
    ResponseEntity<List<CommandeDTO>> getCommandesByLivreur(@PathVariable Long livreurId);

    @GetMapping("/statut/{statut}")
    ResponseEntity<List<CommandeDTO>> getCommandesByStatut(@PathVariable String statut);

    @GetMapping("/details/{commandeId}")
    public ResponseEntity<CommandeDTO> getCommandeDetails(@PathVariable Long commandeId);

    @PutMapping("/{commandeId}/pret")
    ResponseEntity<String> changerStatutPrete(@PathVariable Long commandeId);
}
