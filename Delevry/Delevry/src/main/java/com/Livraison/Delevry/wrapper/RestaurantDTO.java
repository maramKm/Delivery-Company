package com.Livraison.Delevry.wrapper;

import com.Livraison.Delevry.pojo.Restaurant;
import lombok.Data;

@Data
public class RestaurantDTO {

    private Long id ;
    private  String nomRestau;
    private  String tel;
    private  String addresse;
    public RestaurantDTO(Restaurant restaurant){
        this.id=restaurant.getId();
        this.addresse=restaurant.getAddresse();
        this.tel=restaurant.getTel();
        this.nomRestau=restaurant.getNomRestau();
    }


}
