package com.jupiter.jwtauth.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jupiter.jwtauth.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
