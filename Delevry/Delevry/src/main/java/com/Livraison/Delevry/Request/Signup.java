package com.Livraison.Delevry.Request;

import lombok.Data;

@Data
public class Signup {
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String tel;
    private String addresse;
    private Boolean dispo ;

    private String role; // "CLIENT", "LIVREUR", "RESTAURANT"

    // Fields specific to subclasses
    private String matricule; // For Livreur
    private String nomEtrep;
    private String nomRestau;
}

