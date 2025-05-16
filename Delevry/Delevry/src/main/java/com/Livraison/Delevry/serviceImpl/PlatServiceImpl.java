package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.dao.PlatDao;
import com.Livraison.Delevry.dao.RestaurantDao;
import com.Livraison.Delevry.pojo.Commande;
import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.pojo.Restaurant;
import com.Livraison.Delevry.service.PlatService;
import com.Livraison.Delevry.wrapper.CommandeDTO;
import com.Livraison.Delevry.wrapper.PlatDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlatServiceImpl implements PlatService {
    @Autowired
    PlatDao platDao;
    @Autowired
    RestaurantDao restaurantDao;
    @Override
    public ResponseEntity<String> addPlatWithImage(Map<String, String> requestMap, MultipartFile image) {
        try {
            // Validate required fields
            if (!validatePlat(requestMap) || image.isEmpty()) {
                return new ResponseEntity<>("Invalid data or missing image", HttpStatus.BAD_REQUEST);
            }

            // Validate image type
            String contentType = image.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return new ResponseEntity<>("Only image files are allowed", HttpStatus.BAD_REQUEST);
            }

            // Get restaurant
            String restaurantIdStr = requestMap.get("restaurantId");
            if (restaurantIdStr == null) {
                return new ResponseEntity<>("restaurantId is required", HttpStatus.BAD_REQUEST);
            }

            Long restId;
            try {
                restId = Long.parseLong(restaurantIdStr);
            } catch (NumberFormatException e) {
                return new ResponseEntity<>("Invalid restaurantId format", HttpStatus.BAD_REQUEST);
            }

            Optional<Restaurant> optionalRest = restaurantDao.findById(restId);
            if (optionalRest.isEmpty()) {
                return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
            }

            // Create upload directory if it doesn't exist
            String uploadDir = "uploads/images/";
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                if (!uploadPath.mkdirs()) {
                    return new ResponseEntity<>("Failed to create upload directory", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            // Generate unique filename
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename != null ?
                    originalFilename.substring(originalFilename.lastIndexOf(".")) : ".jpg";
            String fileName = UUID.randomUUID() + fileExtension;

            // Save image
            Path imagePath = Paths.get(uploadDir, fileName);
            try {
                Files.write(imagePath, image.getBytes());
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to save image", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Create and save plat
            Plat plat = new Plat();
            plat.setNom(requestMap.get("nom"));
            plat.setDescription(requestMap.get("description"));
            plat.setPrix(requestMap.get("prix"));
            plat.setImagePath(fileName); // Store only filename or relative path
            plat.setRestaurant(optionalRest.get());

            platDao.save(plat);
            return new ResponseEntity<>("Plat with image added successfully", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<Map<String, String>> editPlat(Map<String, String> requestMap) {
        Map<String, String> response = new HashMap<>();
        try {
            // Fetch the Plat by ID
            Optional<Plat> existingPlatOpt = platDao.findById(Long.parseLong(requestMap.get("id")));
            if (!existingPlatOpt.isPresent()) {
                response.put("message", "Plat not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            // Get the existing Plat and update its attributes
            Plat existingPlat = existingPlatOpt.get();

            // Update values
            existingPlat.setNom(requestMap.get("nom"));
            existingPlat.setDescription(requestMap.get("description"));
            existingPlat.setPrix(requestMap.get("prix"));

            // Save to database
            platDao.save(existingPlat);

            response.put("message", "Plat updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Something went wrong: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<PlatDTO>> GetAllPlats() {
        try {
            List<Plat> plats = platDao.findAll();
            List<PlatDTO> platDTOs = plats.stream()
                    .map(PlatDTO::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(platDTOs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Plat> updatePlatImage(Long id, String imagePath) {
        try{
            Plat plat = getPlat(id);
            plat.setImagePath(imagePath);
            Plat savedPlat = platDao.save(plat);
            return new ResponseEntity<>(savedPlat, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<List<PlatDTO>> getPlatsByRestaurant(Long restaurantId) {
        try {
            Optional<Restaurant> restaurantOpt = restaurantDao.findById(restaurantId);
            if (restaurantOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Plat> plats = platDao.findByRestaurantId(restaurantId);
            List<PlatDTO> platDTOs = plats.stream()
                    .map(PlatDTO::new)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(platDTOs, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<Map<String, String>> Addplat(Map<String, String> requestMap) {
        Map<String, String> response = new HashMap<>();

        try {
            if (!validatePlat(requestMap)) {
                response.put("message", "Invalid data");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            String restaurantIdStr = requestMap.get("restaurantId");
            if (restaurantIdStr == null) {
                response.put("message", "restaurantId is required");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Long restId;
            try {
                restId = Long.parseLong(restaurantIdStr);
            } catch (NumberFormatException e) {
                response.put("message", "Invalid restaurantId format");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Optional<Restaurant> optionalRest = restaurantDao.findById(restId);
            if (optionalRest.isEmpty()) {
                response.put("message", "Restaurant not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            Plat plat = new Plat();

            plat.setNom(requestMap.get("nom"));
            plat.setDescription(requestMap.get("description"));
            plat.setPrix(requestMap.get("prix"));
            plat.setRestaurant(optionalRest.get());

            platDao.save(plat);

            response.put("message", "Plat with image added successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Something went wrong: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




            private Plat getPlat (Long id){
                return platDao.findById(id)
                        .orElseThrow(() -> new RuntimeException("Plat not found"));
            }


            private boolean validatePlat (Map < String, String > requestMap){
                return requestMap.containsKey("prix") && requestMap.containsKey("description") && requestMap.containsKey("nom");
            }
    }



