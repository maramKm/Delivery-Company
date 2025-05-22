package com.Livraison.Delevry.service;

import com.Livraison.Delevry.pojo.Livreur;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import com.Livraison.Delevry.wrapper.LivreurDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LivraiosnService {

    List<CommandeDTO> getCommandesPreparees();

    List<LivreurDTO> getLivreursDisponibles();

    boolean affecterLivreur(Long commandeId, Long livreurId);

    List<LivraisonDTO> getLivraisonsLivreur(Long livreurId);

    boolean accepterLivraison(Long livraisonId, Long livreurId);

    boolean marquerCommeLivree(Long livraisonId);

    boolean confirmerLivraison(Long livraisonId);

    List<LivraisonDTO> getLivraisonsClient(Long clientId);

}
