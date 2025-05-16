package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommandeDao extends JpaRepository<Commande,Long> {
    List<Commande> findByRestaurantId(Long restaurantId);
    List<Commande> findByClientId(Long clientId);
    List<Commande> findByLivreurId(Long livreurId);
    List<Commande> findByStatut(String statut);

}
