package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Livraison;
import com.Livraison.Delevry.pojo.Livreur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LivraisonDao extends JpaRepository<Livraison,Long> {

    // Find livraisons by livreur ID
    List<Livraison> findByLivreurId(Long livreurId);

    // Find livraisons by client ID (through commande relationship)
    List<Livraison> findByCommandeClientId(Long clientId);

    // Find livreur by ID (if needed)
    Optional<Livreur> findLivreurById(Long livreurId);
}
