package com.Livraison.Delevry.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Toutes les requêtes
                .allowedOrigins("http://localhost:4200") // Permettre l'origine du frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE" ,  "OPTIONS") // Les méthodes HTTP autorisées
                .allowedHeaders("*"); // Autoriser tous les headers
    }
}
