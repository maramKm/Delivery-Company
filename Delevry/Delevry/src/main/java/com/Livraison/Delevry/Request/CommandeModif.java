package com.Livraison.Delevry.Request;

import lombok.Data;

import java.util.List;
@Data
public class CommandeModif {
    private String adresseLivraison;
    private List<Long> platsIds; // Liste des identifiants des plats à ajouter
    private List<Long> platsASupprimerIds;
}
