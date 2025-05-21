package com.Livraison.Delevry.pojo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Plat {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "description")
    private String description;

    @Column(name = "prix")
    private String prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "plat")
    private List<CommandePlat> commandePlats;


    public Plat( String prix, String description, String nom) {
        this.prix = prix;
        this.description = description;
        this.nom = nom;
    }

    public Plat(String description, String nom, String prix, Restaurant restaurant) {
        this.description = description;
        this.nom = nom;
        this.prix = prix;
        this.restaurant = restaurant;
    }
}
