package com.Livraison.Delevry.restImpl;

import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.rest.PlatRest;
import com.Livraison.Delevry.service.PlatService;
import com.Livraison.Delevry.wrapper.PlatDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
public class PlatRestImpl implements PlatRest {
    @Autowired
    PlatService platService;
    @Override
    public ResponseEntity<Map<String, String>> AddPlat(Map<String, String> requestMap) {
        try {
            return platService.Addplat(requestMap);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Something went wrong: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String,String>> editPlat(Map<String, String> requestMap) {
        try {

            return platService.editPlat(requestMap);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        }
    @Override
    public ResponseEntity<List<PlatDTO>> GetAllPlats() {
        try {
            return platService.GetAllPlats();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<PlatDTO>> getPlatsByRestaurant(Long restaurantId) {
        try {
            return platService.getPlatsByRestaurant(restaurantId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> uploadImage(Long id, MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            platService.updatePlatImage(id, filename);
            return ResponseEntity.ok("Image uploaded");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }

    @Override
    public ResponseEntity<String> addPlatWithImage(PlatDTO platRequest, MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                // Validate content type
                if (image.getContentType() == null || !image.getContentType().startsWith("image/")) {
                    return ResponseEntity.badRequest().body("Only image files are allowed");
                }
                // Process your file
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                // Save file logic here
            }
            // Process platRequest
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}