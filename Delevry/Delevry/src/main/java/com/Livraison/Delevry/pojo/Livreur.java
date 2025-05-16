package com.Livraison.Delevry.pojo;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@DiscriminatorValue("LIVREUR")
public class Livreur extends Personne{
    @Column(name = "dispo")
    private Boolean dispo;

    @Column(name = "matricule")
    private String matricule;

    //@ManyToOne
    //@JoinColumn(name = "entreprise_id")
    //private Entreprise entreprise;

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id;

    public Livreur(String nom, String prenom, String email, String password, Boolean status, String tel, String addresse,Boolean dispo,String matricule) {
        super(nom, prenom, email, password, status, tel, addresse);
        this.dispo=dispo;
        this.matricule=matricule;
    }


    public boolean isDispo() {
        return dispo;
    }

    public void setDispo(boolean dispo) {
        this.dispo = dispo;
    }
    @Override
    public String getRole() {
        return "LIVREUR";
    }
}
