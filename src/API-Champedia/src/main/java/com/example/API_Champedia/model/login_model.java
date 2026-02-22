package com.example.API_Champedia.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "login") // bisa diganti nama collection sesuai kebutuhan
public class login_model {

    private String email;
    private String password;

    public login_model() {
    }

    public login_model (String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
