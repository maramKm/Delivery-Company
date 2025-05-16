package com.Livraison.Delevry.wrapper;

import com.Livraison.Delevry.pojo.Plat;
import lombok.Data;

@Data
public class PlatDTO {
    private int id;
    private String nom;
    private String description;
    private String prix;
    private Long restaurantId;


    public PlatDTO(Plat plat) {
        this.id=plat.getId();
        this.nom = plat.getNom();
        this.description = plat.getDescription();
        this.prix = plat.getPrix();
        this.restaurantId=plat.getRestaurant().getId();
    }
}
