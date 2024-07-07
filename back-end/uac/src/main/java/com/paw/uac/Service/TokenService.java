package com.paw.uac.Service;

import com.paw.uac.Service.interfaces.ITokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class TokenService implements ITokenService {
    @Value("${security.jwt.token.secret}")
    private String secretJwt;

    @Override
    public String generateJwtToken(int id) {
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secretJwt),
                SignatureAlgorithm.HS256.getJcaName());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);

        Instant now = Instant.now();
        return Jwts.builder()
                .addClaims(claims)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(60, ChronoUnit.MINUTES)))
                .signWith(SignatureAlgorithm.HS256, hmacKey)
                .compact();

    }

    @Override
    public int decryptJwtToken(String token) {
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secretJwt),
                SignatureAlgorithm.HS256.getJcaName());

        Claims claims = Jwts.parser().setSigningKey(hmacKey).parseClaimsJws(token).getBody();

        return claims.get ("id", Integer.class);

    }
}
