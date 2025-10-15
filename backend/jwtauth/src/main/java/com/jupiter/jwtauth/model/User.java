package com.jupiter.jwtauth.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String username;
    private String password;
}
// package com.jupiter.jwtauth.model;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;
// import lombok.Data;

// @Data
// @Entity
// @Table(name = "users")
// public class User {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank(message = "Name cannot be empty")
//     private String name;

//     @Column(unique = true)
//     @NotBlank(message = "Username is required")
//     @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
//     private String username;

//     @NotBlank(message = "Password cannot be empty")
//     @Size(min = 8, message = "Password must be at least 8 characters long")
//     @Pattern(
//         regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
//         message = "Password must contain uppercase, lowercase, number, and special character"
//     )
//     private String password;

//     @Email(message = "Invalid email format")
//     private String email;
// }
