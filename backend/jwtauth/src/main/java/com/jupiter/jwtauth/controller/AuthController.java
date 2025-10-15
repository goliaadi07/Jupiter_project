// // package com.jupiter.jwtauth.controller;

// // import com.jupiter.jwtauth.model.User;
// // import com.jupiter.jwtauth.repository.UserRepository;
// // import com.jupiter.jwtauth.service.JwtService;
// // import lombok.RequiredArgsConstructor;
// // import org.springframework.security.authentication.AuthenticationManager;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.web.bind.annotation.*;

// // @RestController
// // @RequestMapping("/api/auth")
// // @CrossOrigin(origins = "http://localhost:5173")
// // @RequiredArgsConstructor
// // public class AuthController {

// //     private final UserRepository userRepository;
// //     private final PasswordEncoder passwordEncoder;
// //     private final AuthenticationManager authenticationManager;
// //     private final JwtService jwtService;

// //     @PostMapping("/signup")
// //     public String signup(@RequestBody User user) {
// //         if (userRepository.existsByUsername(user.getUsername())) {
// //             return "Username already exists";
// //         }
// //         user.setPassword(passwordEncoder.encode(user.getPassword()));
// //         userRepository.save(user);
// //         return "Account created successfully!";
// //     }

// //     @PostMapping("/login")
// //     public String login(@RequestBody User user) {
// //         authenticationManager.authenticate(
// //                 new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
// //         );
// //         return jwtService.generateToken(user.getUsername());
// //     }
// // }



// // package com.jupiter.jwtauth.controller;

// // import com.jupiter.jwtauth.model.User;
// // import com.jupiter.jwtauth.repository.UserRepository;
// // import com.jupiter.jwtauth.service.JwtService;
// // import lombok.RequiredArgsConstructor;
// // import org.springframework.security.authentication.AuthenticationManager;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.core.Authentication;
// // import org.springframework.security.core.AuthenticationException;
// // import org.springframework.web.bind.annotation.*;

// // @RestController
// // @RequestMapping("/api/auth")
// // @CrossOrigin(origins = "http://localhost:5173") // ✅ Allow React frontend
// // @RequiredArgsConstructor
// // public class AuthController {

// //     private final AuthenticationManager authenticationManager;
// //     private final JwtService jwtService;
// //     private final UserRepository userRepository;

// //     @PostMapping("/signup")
// //     public String signup(@RequestBody User user) {
// //         user.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(user.getPassword()));
// //         userRepository.save(user);
// //         return "User registered successfully!";
// //     }

// //     @PostMapping("/login")
// //     public String login(@RequestBody User user) {
// //         try {
// //             Authentication authentication = authenticationManager.authenticate(
// //                     new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
// //             );
// //             if (authentication.isAuthenticated()) {
// //                 return jwtService.generateToken(user.getUsername());
// //             } else {
// //                 throw new RuntimeException("Authentication failed");
// //             }
// //         } catch (AuthenticationException e) {
// //             throw new RuntimeException("Invalid credentials");
// //         }
// //     }
// // }
// package com.jupiter.jwtauth.controller;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.jupiter.jwtauth.model.User;
// import com.jupiter.jwtauth.repository.UserRepository;
// import com.jupiter.jwtauth.service.JwtService;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthenticationManager authenticationManager;
//     private final JwtService jwtService;
//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @PostMapping("/signup")
//     public String signup(@RequestBody User user) {
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         userRepository.save(user);
//         return "User registered successfully!";
//     }

//     @PostMapping("/login")
//     public String login(@RequestBody User user) {
//         try {
//             Authentication authentication = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
//             );
//             if (authentication.isAuthenticated()) {
//                 User dbUser = userRepository.findByUsername(user.getUsername())
//                         .orElseThrow(() -> new RuntimeException("User not found"));
//                 return jwtService.generateToken(dbUser.getUsername());
//             } else {
//                 throw new RuntimeException("Authentication failed");
//             }
//         } catch (AuthenticationException e) {
//             throw new RuntimeException("Invalid credentials");
//         }
//     }
// }
// package com.jupiter.jwtauth.controller;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.jupiter.jwtauth.model.User;
// import com.jupiter.jwtauth.repository.UserRepository;
// import com.jupiter.jwtauth.service.JwtService;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthenticationManager authenticationManager;
//     private final JwtService jwtService;
//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @PostMapping("/signup")
//     public String signup(@RequestBody User user) {
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         userRepository.save(user);
//         return "User registered successfully!";
//     }

//     @PostMapping("/login")
//     public String login(@RequestBody User user) {
//         try {
//             Authentication authentication = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
//             );
//             if (authentication.isAuthenticated()) {
//                 User dbUser = userRepository.findByUsername(user.getUsername())
//                         .orElseThrow(() -> new RuntimeException("User not found"));
//                 return jwtService.generateToken(dbUser.getUsername());
//             } else {
//                 throw new RuntimeException("Authentication failed");
//             }
//         } catch (AuthenticationException e) {
//             throw new RuntimeException("Invalid credentials");
//         }
//     }
// }
package com.jupiter.jwtauth.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jupiter.jwtauth.model.PasswordResetToken;
import com.jupiter.jwtauth.model.User;
import com.jupiter.jwtauth.repository.PasswordResetTokenRepository;
import com.jupiter.jwtauth.repository.UserRepository;
import com.jupiter.jwtauth.service.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    // ✅ Signup
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("✅ User registered successfully!");
    }

    // ✅ Login (returns JWT)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                User dbUser = userRepository.findByUsername(user.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found"));

                String token = jwtService.generateToken(dbUser.getUsername());
                return ResponseEntity.ok(token);
            } else {
                throw new RuntimeException("Authentication failed");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid credentials");
        }
    }

    // ✅ Forgot Password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Optional<User> optionalUser = userRepository.findByUsername(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ No account found with that email.");
        }

        User user = optionalUser.get();

        // Generate token valid for 15 mins
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusMinutes(15));
        tokenRepository.save(resetToken);

        // Email link
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        sendEmail(email, "Reset your password",
                "Hi " + user.getName() + ",\n\n" +
                "You requested to reset your password.\n" +
                "Click the link below to reset it:\n" + resetLink +
                "\n\nThis link will expire in 15 minutes.\n\n" +
                "If you didn't request this, please ignore this email.\n\n" +
                "Regards,\nJupIter Support Team");

        return ResponseEntity.ok("✅ Password reset link sent successfully to " + email);
    }

    // ✅ Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        Optional<PasswordResetToken> optionalToken = tokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Invalid or expired token.");
        }

        PasswordResetToken resetToken = optionalToken.get();

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(resetToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Token expired. Request a new one.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken); // Remove used token

        return ResponseEntity.ok("✅ Password reset successfully!");
    }

    // ✅ Email Sender Helper
    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
