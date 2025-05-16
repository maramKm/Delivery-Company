package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Livreur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LivreurDao extends JpaRepository<Livreur,Long> {
    Optional<Livreur> findByDispoTrue();
}
