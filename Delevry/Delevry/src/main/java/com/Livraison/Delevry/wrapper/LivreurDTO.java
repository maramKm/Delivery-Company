package com.Livraison.Delevry.wrapper;

import com.Livraison.Delevry.pojo.Livreur;
import lombok.Data;
import org.springframework.data.jpa.repository.Query;


@Data
public class LivreurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String matricule;
    private boolean dispo;

    public LivreurDTO(Livreur livreur) {
        this.id = livreur.getId();
        this.nom = livreur.getNom();
        this.prenom = livreur.getPrenom();
        this.matricule = livreur.getMatricule();
        this.dispo = livreur.isDispo();
    }
}
