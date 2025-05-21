package com.Livraison.Delevry.pojo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class CommandePlat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "plat_id")
    private Plat plat;

    private int quantite;

    public CommandePlat(Commande commande, Plat plat, int quantite) {
        this.commande = commande;
        this.plat = plat;
        this.quantite = quantite;
    }


}
