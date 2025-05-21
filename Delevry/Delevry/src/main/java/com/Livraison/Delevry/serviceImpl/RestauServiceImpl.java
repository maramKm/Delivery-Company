package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.dao.ClientDao;
import com.Livraison.Delevry.dao.RestaurantDao;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.pojo.Personne;
import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.pojo.Restaurant;
import com.Livraison.Delevry.service.RestauService;
import com.Livraison.Delevry.wrapper.PlatDTO;
import com.Livraison.Delevry.wrapper.RestaurantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestauServiceImpl implements RestauService {
    @Autowired
    ClientDao clientDao;
    @Override
    public ResponseEntity<List<RestaurantDTO>> getRestauTrue() {
        try {
            List<Restaurant> restaurants = clientDao.findByRole();

            if (restaurants.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<RestaurantDTO> restaurantDTOS = restaurants.stream()
                    .map(RestaurantDTO::new) // Make sure RestaurantDTO has a constructor taking Restaurant
                    .collect(Collectors.toList());

            return new ResponseEntity<>(restaurantDTOS, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> changerStatut(Long restauId, Map<String, Boolean> request) {
        try {
            Boolean active = request.get("active");
            Optional<Personne> restaurantOptional = clientDao.findById(restauId);

            if (!restaurantOptional.isPresent()) {
                return new ResponseEntity<>("restaurant non trouvée", HttpStatus.NOT_FOUND);
            }

            Personne restaurant = restaurantOptional.get();
            restaurant.setStatus(!restaurant.getStatus());
            clientDao.save(restaurant);

            return new ResponseEntity<>("Statut de la restaurant mis à jour avec succès", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de la mise à jour du statut", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
