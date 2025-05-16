package com.Livraison.Delevry.pojo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String statusCommande;

    private LocalDateTime dateLivraison;

    @OneToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "livreur_id")
    private Livreur livreur;



    public Livraison(String statusCommande, LocalDateTime dateLivraison, Commande commande, Livreur livreur) {
        this.statusCommande = statusCommande;
        this.dateLivraison = dateLivraison;
        this.commande = commande;
        this.livreur = livreur;
    }
}
