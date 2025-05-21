package com.Livraison.Delevry.pojo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montant;
    private LocalDateTime dateCommande;
    private String statut;
    private String adresseLivraison;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Personne client;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "livreur_id")
    private Personne livreur;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommandePlat> commandePlats;

    public Commande(Personne livreur, Restaurant restaurant, Personne client, String adresseLivraison) {
        this.livreur = livreur;
        this.restaurant = restaurant;
        this.client = client;
        this.adresseLivraison = adresseLivraison;
    }
}

