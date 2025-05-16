package com.Livraison.Delevry.pojo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@DiscriminatorValue("RESTAURANT")
public class Restaurant extends Personne {

    @Column(name = "nom_restau")
    private String nomRestau;

    //@Column(name = "horaire")
    //private Date horaire;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commande> commandes;


    public Restaurant(String nom, String prenom, String email, String password, boolean status, String tel, String addresse,String nomRestau) {
        super(nom, prenom, email, password, status, tel, addresse);
        //this.horaire = horaire;
        this.nomRestau=nomRestau;
    }
    @Override
    public String getRole() {
        return "RESTAURANT";
    }
}
