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

    @Column(name = "description") // Renamed from "desc" to "description"
    private String description;

    @Column(name = "prix")
    private String prix;

    @ManyToMany(mappedBy = "plats")
    private List<Commande> commandes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(List<Commande> commandes) {
        this.commandes = commandes;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    private String imagePath;


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
