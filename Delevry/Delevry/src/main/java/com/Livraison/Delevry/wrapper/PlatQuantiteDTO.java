package com.Livraison.Delevry.wrapper;

import lombok.Data;

@Data
class PlatQuantiteDTO {
    private String platNom;
    private Integer quantite;

    public PlatQuantiteDTO(String platNom, Integer quantite) {
        this.platNom = platNom;
        this.quantite = quantite;
    }
}
