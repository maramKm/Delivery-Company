package com.Livraison.Delevry.pojo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@DiscriminatorValue("ENTREPRISE")
public class Entreprise extends Personne {

    @Column(name = "nomEntrep")
    private String nomEntrep;

    // Une entreprise a plusieurs livreurs
    //@OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL, orphanRemoval = true)
    //private List<Livreur> livreurs;

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id;

    public Entreprise(String nom, String prenom, String email, String password, boolean status, String tel, String addresse, String nomEntrep) {
        super(nom, prenom, email, password, status, tel, addresse);
        this.nomEntrep = nomEntrep;
    }
    @Override
    public String getRole() {
        return "ENTREPRISE";
    }
}
