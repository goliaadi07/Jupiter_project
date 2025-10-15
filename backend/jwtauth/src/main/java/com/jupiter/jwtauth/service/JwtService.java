// package com.jupiter.jwtauth.service;

// import java.util.Date;

// import javax.crypto.SecretKey;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// import io.jsonwebtoken.JwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.security.Keys;

// @Service
// public class JwtService {

//     @Value("${jwt.secret}")
//     private String secret;

//     @Value("${jwt.expiration}")
//     private long expiration;

//     // ✅ Must return SecretKey (not just Key)
//     private SecretKey getSigningKey() {
//         return Keys.hmacShaKeyFor(secret.getBytes());
//     }

//     // ✅ JJWT 0.12+ syntax
//     public String generateToken(String username) {
//         return Jwts.builder()
//                 .subject(username)
//                 .issuedAt(new Date())
//                 .expiration(new Date(System.currentTimeMillis() + expiration))
//                 .signWith(getSigningKey(), Jwts.SIG.HS256)  // ✅ correct combo
//                 .compact();
//     }

//     // ✅ New parser API
//     public String extractUsername(String token) {
//         return Jwts.parser()
//                 .verifyWith(getSigningKey())
//                 .build()
//                 .parseSignedClaims(token)
//                 .getPayload()
//                 .getSubject();
//     }

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser()
//                     .verifyWith(getSigningKey())
//                     .build()
//                     .parseSignedClaims(token);
//             return true;
//         } catch (JwtException e) {
//             return false;
//         }
//     }
// }
package com.jupiter.jwtauth.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        // 256-bit key minimum for HS256
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
