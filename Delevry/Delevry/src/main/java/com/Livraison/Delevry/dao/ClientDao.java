package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Client;
import com.Livraison.Delevry.pojo.Personne;
import com.Livraison.Delevry.pojo.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientDao extends JpaRepository<Personne,Long> {

    //Personne findByEmail(String email);
    Optional<Personne> findByEmail(String email);
    @Query("SELECT p FROM Personne p WHERE p.id = :id AND TYPE(p) = Restaurant")
    Optional<Personne> findRestaurantById(@Param("id") Long id);
    @Query("select p from Personne p where TYPE(p) = Restaurant")
    List<Restaurant> findByRole();

}
