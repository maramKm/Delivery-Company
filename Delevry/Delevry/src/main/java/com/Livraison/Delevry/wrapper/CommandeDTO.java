package com.Livraison.Delevry.wrapper;
import com.Livraison.Delevry.pojo.Commande;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Data
public class CommandeDTO {
    private Long id;
    private Double montant;
    private LocalDateTime dateCommande;
    private String statut;
    private String adresseLivraison;
    private String clientNom;
    private String restaurantNom;
    private String livreurNom;
    private List<PlatQuantiteDTO> plats;

    public CommandeDTO(Commande commande) {
        this.id = commande.getId();
        this.montant = commande.getMontant();
        this.dateCommande = commande.getDateCommande();
        this.statut = commande.getStatut();
        this.adresseLivraison = commande.getAdresseLivraison();
        this.clientNom = commande.getClient() != null ?
                commande.getClient().getNom() + " " + commande.getClient().getPrenom() : "N/A";
        this.restaurantNom = commande.getRestaurant() != null ?
                commande.getRestaurant().getNom() : "N/A";
        this.livreurNom = commande.getLivreur() != null ?
                commande.getLivreur().getNom() + " " + commande.getLivreur().getPrenom() : "Pas encore assigné un livreur";

        this.plats = commande.getCommandePlats().stream()
                .map(cp -> new PlatQuantiteDTO(cp.getPlat().getNom(), cp.getQuantite()))
                .collect(Collectors.toList());
    }

}