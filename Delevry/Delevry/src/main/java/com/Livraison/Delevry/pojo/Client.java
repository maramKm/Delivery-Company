package com.Livraison.Delevry.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NamedQuery(name="Client.findByEmailId",query="select c from Client c where c.email=:email")
@Data
@NoArgsConstructor
@Entity
@DiscriminatorValue("CLIENT")
public class Client extends Personne {

    // One client can have multiple commandes
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Commande> commandes;


    public Client(String nom, String prenom, String email, String password, boolean status, String tel, String addresse) {
        super(nom, prenom, email, password, status, tel, addresse);
    }
    @Override
    public String getRole() {
        return "CLIENT";
    }

}
