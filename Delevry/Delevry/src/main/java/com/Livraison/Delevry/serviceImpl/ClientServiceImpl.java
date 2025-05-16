package com.Livraison.Delevry.serviceImpl;

import com.Livraison.Delevry.Request.Signup;
import com.Livraison.Delevry.dao.ClientDao;
import com.Livraison.Delevry.pojo.*;
import com.Livraison.Delevry.service.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClientServiceImpl implements ClientService {
    private static final Logger log = LoggerFactory.getLogger(ClientServiceImpl.class);
    @Autowired
    ClientDao clientDao;

   // @Autowired
    //Personne personne;

    /*@Override
    public ResponseEntity<String> signup(Signup requestMap) {
        try{
            log.info("Inside signup{}" , requestMap);
            if(validateSignup(requestMap)){
                Client client =clientDao.findByEmailId(requestMap.get("email"));
                if(Objects.isNull(client)){
                    clientDao.save(getClientFormMap(requestMap));
                    return new ResponseEntity<String>("SignUp succecfully ", HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<String>("email is already exist", HttpStatus.BAD_REQUEST);

                }
            }
            else {
                return new ResponseEntity<String>("Invalid Data", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("Somthing went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
*/
    @Override
    public ResponseEntity<String> signup(Signup requestMap) {
        try {
            Optional<Personne> existingPersonne = clientDao.findByEmail(requestMap.getEmail());

            // Check if the Optional is present
            if (existingPersonne.isPresent()) {
                return new ResponseEntity<>("Email already in use", HttpStatus.BAD_REQUEST);
            }

            Personne newPersonne = createPersonneFromRequest(requestMap);
            clientDao.save(newPersonne);

            return new ResponseEntity<>("Signup successful", HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private Personne createPersonneFromRequest(Signup request) {
        switch (request.getRole().toUpperCase()) {
            case "CLIENT":
                return new Client(
                        request.getNom(), request.getPrenom(), request.getEmail(),
                        request.getPassword(), true, request.getTel(), request.getAddresse()
                );
            case "LIVREUR":
                return new Livreur(
                        request.getNom(), request.getPrenom(), request.getEmail(),
                        request.getPassword(), true, request.getTel(), request.getAddresse(),  request.getDispo() != null ? request.getDispo() : true,request.getMatricule()
                );
            case "RESTAURANT":
                return new Restaurant(
                        request.getNom(), request.getPrenom(), request.getEmail(),
                        request.getPassword(), false, request.getTel(), request.getAddresse(),request.getNomRestau()
                );
            case "ENTREPRISE":
                return new Entreprise(
                        request.getNom(), request.getPrenom(), request.getEmail(),
                        request.getPassword(), true, request.getTel(), request.getAddresse(),request.getNomEtrep()
                );
            default:
                throw new IllegalArgumentException("Unknown role: " + request.getRole());
        }
    }



    private boolean validateSignup(Map<String, String> requestMap){
        if(requestMap.containsKey("nom") && requestMap.containsKey("prenom") && requestMap.containsKey("email") && requestMap.containsKey("password") && requestMap.containsKey("tel") && requestMap.containsKey("addresse") )
        {
            return true ;
        }
        return false;
    }
    private boolean validateLogin(Map<String, String> requestMap) {
        return requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    @Override
    public ResponseEntity<Map<String, Object>> login(Map<String, String> requestMap) {
        Map<String, Object> response = new HashMap<>();
        try {
            log.info("Inside login {}", requestMap);

            // Validate login data
            if (!validateLogin(requestMap)) {
                response.put("message", "Invalid Data");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Fetch person by email
            Optional<Personne> personOptional = clientDao.findByEmail(requestMap.get("email"));

            // Check if email exists
            if (personOptional.isEmpty()) {
                response.put("message", "Email not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            // Get the Personne object from the Optional
            Personne person = personOptional.get();

            // Verify password
            if (person.getPassword().equals(requestMap.get("password"))) {
                if (person.getStatus()) {
                    response.put("message", "Login successful");
                    response.put("role", person.getRole());
                    response.put("id", person.getId());
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    response.put("message", "Waiting for approval from Admin");
                    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
                }
            } else {
                response.put("message", "Incorrect password");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            log.error("Error during login", e);
            response.put("message", "Something went wrong");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private Client getClientFormMap(Map<String,String> requestMap){
        Client client = new Client();
        client.setAddresse(requestMap.get("addresse"));
        client.setEmail(requestMap.get("email"));
        client.setNom(requestMap.get("nom"));
        client.setPassword(requestMap.get("password"));
        client.setPrenom(requestMap.get("prenom"));
        client.setTel(requestMap.get("tel"));
        client.setStatus(true);
        client.setCommandes(new ArrayList<>());
        return client;
    }
}
