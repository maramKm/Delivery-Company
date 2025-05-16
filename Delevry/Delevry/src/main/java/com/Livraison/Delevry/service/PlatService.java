package com.Livraison.Delevry.service;

import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.wrapper.PlatDTO;
import org.aspectj.apache.bcel.util.Repository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface PlatService {
    ResponseEntity<String> addPlatWithImage(Map<String,String> requestMap,
                                   MultipartFile image);
    ResponseEntity<Map<String,String>> editPlat(Map<String,String> requestMap);
    ResponseEntity<List<PlatDTO>> GetAllPlats();
    ResponseEntity<Plat> updatePlatImage(Long id , String imagePath);
    ResponseEntity<List<PlatDTO>> getPlatsByRestaurant(Long restaurantId);
    ResponseEntity<Map<String,String>> Addplat(Map<String, String> requestMap);


}
