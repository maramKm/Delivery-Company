package com.Livraison.Delevry.serviceImpl;


import com.Livraison.Delevry.Request.CommandeModif;
import com.Livraison.Delevry.dao.*;
import com.Livraison.Delevry.pojo.*;
import com.Livraison.Delevry.service.CommandeService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommandeServiceImpl implements CommandeService {
    @Autowired
    ClientDao clientDao;

    @Autowired
    RestaurantDao restaurantDao;
    @Autowired
    PlatDao platDao;
    @Autowired
    CommandeDao commandeDao;

    @Autowired
    LivreurDao livreurDao;

    @Override
    public ResponseEntity<Map<String, String>> AddCommande(Map<String, Object> requestMap) {
        try {
            // Récupération des IDs
            Long clientId = Long.parseLong(requestMap.get("clientId").toString());
            Long restaurantId = Long.parseLong(requestMap.get("restaurantId").toString());
            List<Integer> platIdsInt = (List<Integer>) requestMap.get("platIds");
            List<Long> platIds = platIdsInt.stream()
                    .map(Integer::longValue)
                    .collect(Collectors.toList());

            // Récupération des entités - USE CORRECT REPOSITORIES
            Personne client = clientDao.findById(clientId).orElse(null);
            Restaurant restaurant = clientDao.findRestaurantById(restaurantId)
                    .map(p -> (Restaurant) p)
                    .orElse(null);

            // Validation de l'existence du client et du restaurant
            if (client == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Client introuvable");
                return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            }

            if (restaurant == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Restaurant introuvable");
                return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            }

            // Vérification des plats
            List<Plat> plats = platDao.findAllById(platIds);
            if (plats.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Aucun plat trouvé");
                return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
            }

            // Validation du montant
            double montant = Double.parseDouble(requestMap.get("montant").toString());
            if (montant <= 0) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Le montant de la commande doit être positif");
                return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
            }

            // Création de la commande
            Commande commande = new Commande();
            commande.setClient(client);
            commande.setRestaurant(restaurant);
            commande.setPlats(plats);
            commande.setDateCommande(LocalDateTime.now());
            commande.setStatut("EN_ATTENTE");
            commande.setAdresseLivraison((String) requestMap.get("adresseLivraison"));
            commande.setMontant((long) montant);
            commande.setLivreur(null);

            // Enregistrement de la commande
            commandeDao.save(commande);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Commande créée avec succès");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erreur lors de la création de commande");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<String> changerStatutCommande(Long commandeId) {
        try {
            Optional<Commande> commandeOpt = commandeDao.findById(commandeId);

            if (!commandeOpt.isPresent()) {
                return new ResponseEntity<>("Commande non trouvée", HttpStatus.NOT_FOUND);
            }

            Commande commande = commandeOpt.get();
            commande.setStatut("PREPARATION");
            commandeDao.save(commande);

            return new ResponseEntity<>("Statut de la commande mis à jour avec succès", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de la mise à jour du statut", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> assignerLivreurEtChangerStatut(Long commandeId) {
        try {
            // Étape 1 : Récupérer la commande par son ID
            Optional<Commande> commandeOpt = commandeDao.findById(commandeId);
            if (!commandeOpt.isPresent()) {
                return new ResponseEntity<>("Commande non trouvée", HttpStatus.NOT_FOUND);
            }
            Commande commande = commandeOpt.get();

            // Étape 2 : Vérifier si la commande est déjà en préparation (statut PREPARATION)
            if (!commande.getStatut().equals("PREPARATION")) {
                return new ResponseEntity<>("La commande n'est pas encore en préparation", HttpStatus.BAD_REQUEST);
            }

            // Étape 3 : Chercher un livreur disponible
            Optional<Livreur> livreurOpt = livreurDao.findByDispoTrue();
            if (!livreurOpt.isPresent()) {
                return new ResponseEntity<>("Aucun livreur disponible", HttpStatus.NOT_FOUND);
            }

            Livreur livreur = livreurOpt.get();

            // Étape 4 : Assigner le livreur à la commande
            commande.setLivreur(livreur);
            livreur.setDispo(false);  // Le livreur n'est plus disponible après être assigné
            livreurDao.save(livreur);  // Sauvegarder les changements du livreur

            // Étape 5 : Mettre à jour le statut de la commande à "LIVRAISON"
            commande.setStatut("LIVRAISON");
            commandeDao.save(commande);  // Sauvegarder la commande avec son nouveau statut

            return new ResponseEntity<>("Livreur assigné et statut de commande mis à jour", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de l'assignation du livreur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<String> annulerCommande(Long commandeId) {
        try {
            Optional<Commande> commandeOpt = commandeDao.findById(commandeId);
            if (!commandeOpt.isPresent()) {
                return new ResponseEntity<>("Commande non trouvée", HttpStatus.NOT_FOUND);
            }

            Commande commande = commandeOpt.get();

            // Vérifier si le statut est "EN ATTENTE"
            if (commande.getStatut().equals("EN ATTENTE")) {
                commande.setStatut("ANNULÉE");  // Changer le statut à "ANNULÉE"
                commandeDao.save(commande);
                return new ResponseEntity<>("Commande annulée avec succès", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("La commande ne peut pas être annulée, car elle n'est pas en attente", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de l'annulation de la commande", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<String> modifierCommande(Long commandeId, CommandeModif request) {
        try {
            Optional<Commande> commandeOpt = commandeDao.findById(commandeId);
            if (!commandeOpt.isPresent()) {
                return new ResponseEntity<>("Commande non trouvée", HttpStatus.NOT_FOUND);
            }

            Commande commande = commandeOpt.get();

            // Modifier l'adresse de livraison
            if (request.getAdresseLivraison() != null && !request.getAdresseLivraison().isEmpty()) {
                commande.setAdresseLivraison(request.getAdresseLivraison());
            }

            // Ajouter les nouveaux plats
            if (request.getPlatsIds() != null && !request.getPlatsIds().isEmpty()) {
                List<Plat> platsToAdd = platDao.findAllById(request.getPlatsIds());
                commande.getPlats().addAll(platsToAdd);
            }

            // Supprimer les plats existants
            if (request.getPlatsASupprimerIds() != null && !request.getPlatsASupprimerIds().isEmpty()) {
                commande.getPlats().removeIf(plat -> request.getPlatsASupprimerIds().contains(plat.getId()));
            }

            // Recalculer le montant total de la commande
            long montantTotal = Math.round(
                    commande.getPlats().stream()
                            .mapToDouble(plat -> Double.parseDouble(plat.getPrix()))
                            .sum()
            );
            commande.setMontant(montantTotal);

            // Sauvegarder les changements
            commandeDao.save(commande);

            return new ResponseEntity<>("Commande modifiée avec succès", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de la modification de la commande", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommandeDTO>> GetAllCommande() {
        try {
            List<Commande> commandes = commandeDao.findAll();
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)  // Transformer chaque commande en CommandeDTO
                    .collect(Collectors.toList());
            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<List<CommandeDTO>> getAllCommandeByRestaurant(Long restaurantId) {
        try {
            // Récupérer les commandes par restaurant
            List<Commande> commandes = commandeDao.findByRestaurantId(restaurantId);

            // Transformer chaque Commande en CommandeDTO
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)  // Transformation en CommandeDTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByClient(Long clientId) {
        try {
            // Récupérer les commandes par client
            List<Commande> commandes = commandeDao.findByClientId(clientId);

            // Transformer chaque Commande en CommandeDTO
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)  // Transformation en CommandeDTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByStatut(String statut) {
        try {
            // Récupérer les commandes par statut
            List<Commande> commandes = commandeDao.findByStatut(statut);

            // Transformer chaque Commande en CommandeDTO
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)  // Transformation en CommandeDTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Override
    public ResponseEntity<List<CommandeDTO>> getCommandesByLivreur(Long livreurId) {
        try {
            // Récupérer les commandes par livreur
            List<Commande> commandes = commandeDao.findByLivreurId(livreurId);

            // Transformer chaque Commande en CommandeDTO
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)  // Transformation en CommandeDTO
                    .collect(Collectors.toList());

            return new ResponseEntity<>(commandeDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}