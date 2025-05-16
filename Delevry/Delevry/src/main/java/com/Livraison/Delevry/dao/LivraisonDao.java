package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivraisonDao extends JpaRepository<Livraison,Long> {
}
