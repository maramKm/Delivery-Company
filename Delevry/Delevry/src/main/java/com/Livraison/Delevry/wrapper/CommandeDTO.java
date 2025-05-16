package com.Livraison.Delevry.wrapper;

import com.Livraison.Delevry.pojo.Commande;
import lombok.Data;


@Data
public class CommandeDTO {
    private Long id;
    private long montant;
    private String statut;
    private String adresseLivraison;
    private String dateCommande;
    private Long clientId;
    private Long restaurantId;

    // Constructeur
    public CommandeDTO(Commande commande) {
        this.id = commande.getId();
        this.montant = commande.getMontant();
        this.statut = commande.getStatut();
        this.adresseLivraison = commande.getAdresseLivraison();
        this.dateCommande = commande.getDateCommande().toString(); // Formatage de la date si nécessaire
        this.clientId = commande.getClient() != null ? commande.getClient().getId() : null;
        this.restaurantId = commande.getRestaurant() != null ? commande.getRestaurant().getId() : null;
    }}
