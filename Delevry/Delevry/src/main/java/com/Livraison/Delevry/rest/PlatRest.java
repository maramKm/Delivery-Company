package com.Livraison.Delevry.rest;

import com.Livraison.Delevry.pojo.Plat;
import com.Livraison.Delevry.wrapper.PlatDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping(path="/plat")
public interface PlatRest{
    @PostMapping(path= "/Add")
    ResponseEntity<Map<String, String>>AddPlat (@RequestBody(required = true) Map<String, String> requestMap);
    @PutMapping(path = "/edit")
    public ResponseEntity<Map<String,String>> editPlat(@RequestBody Map<String, String> requestMap);
    @GetMapping(path = "/getPlat")
    ResponseEntity<List<PlatDTO>>GetAllPlats();

    @GetMapping(path = "/getPlatRestau/{id}")
    ResponseEntity<List<PlatDTO>>getPlatsByRestaurant(@PathVariable("id") Long restaurantId);

    @PostMapping("/{id}/upload-image")
    ResponseEntity<String> uploadImage(@PathVariable Long id,@RequestParam("image") MultipartFile file);
    @PostMapping(value = "/add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> addPlatWithImage(
            @RequestPart("plat") PlatDTO platRequest,
            @RequestPart("image") MultipartFile image);
}

