package com.Livraison.Delevry.pojo;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
public abstract class Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String nom;

    protected String prenom;

    protected String email;

    protected String password;

    protected Boolean status;

    protected String tel;

    protected String addresse;

    public Personne(String nom, String prenom, String email, String password, Boolean status, String tel, String addresse) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.status = status;
        this.tel = tel;
        this.addresse = addresse;
    }
    public abstract String getRole();

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getTel() {
        return tel;
    }

    public String getAddresse() {
        return addresse;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAddresse(String addresse) {
        this.addresse = addresse;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
