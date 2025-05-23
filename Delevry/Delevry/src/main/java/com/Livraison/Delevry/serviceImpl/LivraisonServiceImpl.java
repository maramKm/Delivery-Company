package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.dao.CommandeDao;
import com.Livraison.Delevry.dao.LivraisonDao;
import com.Livraison.Delevry.dao.LivreurDao;
import com.Livraison.Delevry.dao.RestaurantDao;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.pojo.Livraison;
import com.Livraison.Delevry.pojo.Livreur;
import com.Livraison.Delevry.pojo.Restaurant;
import com.Livraison.Delevry.service.LivraiosnService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.LivraisonDTO;
import com.Livraison.Delevry.wrapper.LivreurDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LivraisonServiceImpl implements LivraiosnService {
    @Autowired
    private LivraisonDao livraisonRepository;

    @Autowired
    private LivreurDao livreurRepository;

    @Autowired
    private CommandeDao commandeRepository;

    @Autowired
    private RestaurantDao restaurantRepository;

    /**
     * Récupère toutes les commandes préparées en attente de livraison
     */
    public List<CommandeDTO> getCommandesPreparees() {
        List<Commande> commandes = commandeRepository.findByStatut("PREPARE");
        return commandes.stream()
                .map(CommandeDTO::new) // Same as (commande -> new CommandeDTO(commande))
                .collect(Collectors.toList());
    }

    /**
     * Récupère tous les livreurs disponibles
     */
    public List<LivreurDTO> getLivreursDisponibles() {
        List<Livreur> livreurs = livreurRepository.findByDispoTrue();

        return livreurs.stream()
                .map(LivreurDTO::new)  // Using the existing constructor that takes Livreur
                .collect(Collectors.toList());
    }

    /**
     * Affecte un livreur à une commande et crée une livraison
     */
    @Transactional
    public boolean affecterLivreur(Long commandeId, Long livreurId) {
        Optional<Commande> commandeOpt = commandeRepository.findById(commandeId);
        Optional<Livreur> livreurOpt = livreurRepository.findById(livreurId);

        if (commandeOpt.isPresent() && livreurOpt.isPresent()) {
            Commande commande = commandeOpt.get();
            Livreur livreur = livreurOpt.get();

            // Vérifier que la commande est bien préparée
            if (!commande.getStatut().equals("PREPARE")) {
                return false;
            }

            // Vérifier que le livreur est disponible
            if (!livreur.isDispo()) {
                return false;
            }

            // Créer une livraison
            Livraison livraison = new Livraison();
            livraison.setCommande(commande);
            livraison.setLivreur(livreur);
            livraison.setStatusCommande("EN_ATTENTE");
            livraison.setDateLivraison(LocalDateTime.now());
            livraisonRepository.save(livraison);

            // Mettre à jour le statut de la commande
            commande.setStatut("EN_LIVRAISON");
            commande.setLivreur(livreur);
            commandeRepository.save(commande);

            return true;
        }

        return false;
    }

    /**
     * Récupère les livraisons affectées à un livreur
     */
    public List<LivraisonDTO> getLivraisonsLivreur(Long livreurId) {
        List<Livraison> livraisons = livraisonRepository.findByLivreurId(livreurId);

        return livraisons.stream()
                .map(LivraisonDTO::new)  // Using the constructor that takes Livraison
                .collect(Collectors.toList());
    }
    /**
     * Acceptation d'une livraison par un livreur
     */
    @Transactional
    public boolean accepterLivraison(Long livraisonId, Long livreurId) {
        Optional<Livraison> livraisonOpt = livraisonRepository.findById(livraisonId);

        if (livraisonOpt.isPresent()) {
            Livraison livraison = livraisonOpt.get();

            // Vérifier que c'est bien le livreur affecté
            if (livraison.getLivreur().getId().equals(livreurId)) {
                livraison.setStatusCommande("EN_COURS");
                livraisonRepository.save(livraison);

                // Mettre à jour la disponibilité du livreur
                Livreur livreur = livraison.getLivreur();
                livreur.setDispo(false);
                livreurRepository.save(livreur);

                return true;
            }
        }

        return false;
    }

    /**
     * Marquer une livraison comme livrée par le livreur
     */
    @Transactional
    public boolean marquerCommeLivree(Long livraisonId) {
        Optional<Livraison> livraisonOpt = livraisonRepository.findById(livraisonId);

        if (livraisonOpt.isPresent()) {
            Livraison livraison = livraisonOpt.get();
            livraison.setStatusCommande("LIVREE");
            livraisonRepository.save(livraison);

            return true;
        }

        return false;
    }

    /**
     * Confirmation de la livraison par le client
     */
    @Transactional
    public boolean confirmerLivraison(Long livraisonId) {
        Optional<Livraison> livraisonOpt = livraisonRepository.findById(livraisonId);

        if (livraisonOpt.isPresent()) {
            Livraison livraison = livraisonOpt.get();
            livraison.setStatusCommande("CONFIRMEE");
            livraisonRepository.save(livraison);

            // Mettre à jour le statut de la commande
            Commande commande = livraison.getCommande();
            commande.setStatut("LIVREE");
            commandeRepository.save(commande);

            // Rendre le livreur à nouveau disponible
            Livreur livreur = livraison.getLivreur();
            livreur.setDispo(true);
            livreurRepository.save(livreur);

            return true;
        }

        return false;
    }

    /**
     * Récupère les livraisons d'un client
     */
    public List<LivraisonDTO> getLivraisonsClient(Long clientId) {
        List<Livraison> livraisons = livraisonRepository.findByCommandeClientId(clientId);
        return livraisons.stream()
                .map(LivraisonDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<LivreurDTO> getAllLivreurs() {
        List<Livreur> livreurs = livreurRepository.findAll();
        return livreurs.stream()
                .map(LivreurDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<LivraisonDTO> getAllLivraisons() {
        List<Livraison> livraisons = livraisonRepository.findAll();
        return livraisons.stream()
                .map(LivraisonDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<LivraisonDTO> getAllLivraisonsByRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .map(restaurant -> {
                    List<Livraison> livraisons = livraisonRepository.findLivraisonsByCommande_Restaurant(restaurant);
                    return livraisons.stream()
                            .map(LivraisonDTO::new)
                            .collect(Collectors.toList());
                })
                .orElseThrow(() -> null);
    }


}
