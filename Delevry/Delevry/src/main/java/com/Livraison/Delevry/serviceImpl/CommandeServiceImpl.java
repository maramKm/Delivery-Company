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

    @Autowired
    LivraisonDao livraisonDao;

    @Override
    public ResponseEntity<Map<String, String>> AddCommande(Map<String, Object> requestMap) {
        try {
            Long clientId = Long.parseLong(requestMap.get("clientId").toString());
            Long restaurantId = Long.parseLong(requestMap.get("restaurantId").toString());

            Personne client = clientDao.findById(clientId).orElse(null);
            Restaurant restaurant = clientDao.findRestaurantById(restaurantId)
                    .map(p -> (Restaurant) p)
                    .orElse(null);

            if (client == null || restaurant == null) {
                return new ResponseEntity<>(Map.of("message", "Client ou restaurant introuvable"), HttpStatus.NOT_FOUND);
            }

            Commande commande = new Commande();
            commande.setClient(client);
            commande.setRestaurant(restaurant);
            commande.setDateCommande(LocalDateTime.now());
            commande.setStatut("EN_ATTENTE");
            commande.setAdresseLivraison((String) requestMap.get("adresseLivraison"));
            commande.setMontant(Double.parseDouble(requestMap.get("montant").toString()));
            commande.setLivreur(null); // pas encore assigné

            List<Map<String, Object>> platsList = (List<Map<String, Object>>) requestMap.get("plats");
            List<CommandePlat> commandePlats = new ArrayList<>();

            for (Map<String, Object> item : platsList) {
                Long platId = Long.parseLong(item.get("id").toString());
                int quantite = Integer.parseInt(item.get("quantite").toString());
                Plat plat = platDao.findById(platId).orElse(null);
                if (plat != null) {
                    CommandePlat cp = new CommandePlat();
                    cp.setPlat(plat);
                    cp.setQuantite(quantite);
                    cp.setCommande(commande); // à lier à la commande
                    commandePlats.add(cp);
                }
            }

            commande.setCommandePlats(commandePlats);

            commandeDao.save(commande);

            return new ResponseEntity<>(Map.of("message", "Commande créée avec succès"), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("message", "Erreur lors de la création de commande"), HttpStatus.INTERNAL_SERVER_ERROR);
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
            commande.setStatut("EN_PREPARATION");
            commandeDao.save(commande);

            return new ResponseEntity<>("Statut de la commande mis à jour avec succès", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de la mise à jour du statut", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CommandeDTO> getCommandeDetails(Long commandeId) {
        try {
            Optional<Commande> optionalCommande = commandeDao.findById(commandeId);

            if (optionalCommande.isPresent()) {
                CommandeDTO dto = new CommandeDTO(optionalCommande.get());
                return new ResponseEntity<>(dto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> changerStatutPrete(Long commandeId) {
        try {
            Optional<Commande> commandeOpt = commandeDao.findById(commandeId);

            if (!commandeOpt.isPresent()) {
                return new ResponseEntity<>("Commande non trouvée", HttpStatus.NOT_FOUND);
            }

            Commande commande = commandeOpt.get();
            commande.setStatut("PREPARE");
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
            if (!commande.getStatut().equals("EN_PREPARATION")) {
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

            Livraison livraison = new Livraison(commande.getStatut(),LocalDateTime.now(),commande,livreur);
            livraisonDao.save(livraison);

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
                return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
            }

            Commande commande = commandeOpt.get();

            // Vérifier si le statut est "EN ATTENTE"
            if (commande.getStatut().equals("EN_ATTENTE")) {
                commande.setStatut("ANNULÉE");  // Changer le statut à "ANNULÉE"
                commandeDao.save(commande);
                return new ResponseEntity<>("Order cancelled successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Order cannot be cancelled because it's not in PENDING status", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error while cancelling the order", HttpStatus.INTERNAL_SERVER_ERROR);
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
               // commande.getPlats().addAll(platsToAdd);
            }

            // Supprimer les plats existants
            if (request.getPlatsASupprimerIds() != null && !request.getPlatsASupprimerIds().isEmpty()) {
               // commande.getPlats().removeIf(plat -> request.getPlatsASupprimerIds().contains(plat.getId()));
            }

            // Recalculer le montant total de la commande
           /* long montantTotal = Math.round(
                   // commande.getPlats().stream()
                            .mapToDouble(plat -> Double.parseDouble(plat.getPrix()))
                            .sum()
            );
            commande.setMontant(montantTotal);*/

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
            List<Commande> commandes = commandeDao.findByClientId(clientId);
            List<CommandeDTO> commandeDTOs = commandes.stream()
                    .map(CommandeDTO::new)
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