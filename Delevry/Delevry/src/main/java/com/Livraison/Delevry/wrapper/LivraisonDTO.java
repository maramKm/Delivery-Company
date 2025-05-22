package com.Livraison.Delevry.wrapper;

import com.Livraison.Delevry.pojo.Livraison;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LivraisonDTO {
    private Long id;
    private LocalDateTime dateLivraison;
    private String statut;
    private String adresse;
    private String commandeClient; // Client name from related commande
    private String commandeRestaurant; // Restaurant name from related commande

    public LivraisonDTO(Livraison livraison) {
        this.id = livraison.getId();
        this.dateLivraison = livraison.getDateLivraison();
        this.statut = livraison.getStatusCommande();
        this.adresse = livraison.getCommande().getAdresseLivraison();

        // Assuming Livraison has a Commande relationship
        if (livraison.getCommande() != null) {
            this.commandeClient = livraison.getCommande().getClient() != null ?
                    livraison.getCommande().getClient().getNom() + " " + livraison.getCommande().getClient().getPrenom() :
                    "N/A";

            this.commandeRestaurant = livraison.getCommande().getRestaurant() != null ?
                    livraison.getCommande().getRestaurant().getNom() :
                    "N/A";
        } else {
            this.commandeClient = "N/A";
            this.commandeRestaurant = "N/A";
        }
    }
}
