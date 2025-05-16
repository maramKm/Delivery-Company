package com.Livraison.Delevry.dao;

import com.Livraison.Delevry.pojo.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantDao extends JpaRepository<Restaurant,Long> {
    List<Restaurant> findAllByStatusTrue();

}
