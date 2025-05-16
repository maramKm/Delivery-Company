package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Plat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatDao extends JpaRepository<Plat,Long> {
    List<Plat> findByRestaurantId(Long restaurantId);

}
