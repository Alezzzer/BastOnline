package com.example.basta.security;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
	    
	    @Value("${app.jwt-secret}")
	    private String jwtSecret;
	    
	    @Value("${app.jwt-expiration-milliseconds}")
	    private long jwtExpirationDate;
	    
	    private static final SignatureAlgorithm ALGORITHM = SignatureAlgorithm.HS384;
	    public String generateToken(Authentication auth) {
	        String username = auth.getName();
	        var authorities = auth.getAuthorities().stream()
	            .map(ga -> ga.getAuthority())
	            .collect(Collectors.toList());

	        Date currentDate = new Date();
	        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

	        return Jwts.builder()
	            .setSubject(username)
	            .claim("roles", authorities) // <- dodajemo role kao claim
	            .setIssuedAt(currentDate)
	            .setExpiration(expireDate)
	            .signWith(key(), ALGORITHM)
	            .compact();
	    }
	    private Key key() {
	        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
	        return Keys.hmacShaKeyFor(keyBytes);
	    }
	    
	    public String getUsername(String token) {
	        Claims claims = Jwts.parserBuilder()
	            .setSigningKey(key())
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	        return claims.getSubject();
	    }
	    
	    public boolean validateToken(String token) {
	        try {
	            Jwts.parserBuilder()
	                .setSigningKey(key())
	                .build()
	                .parseClaimsJws(token);
	            return true;
	        } catch (Exception ex) {
	
	            System.err.println("JWT validation error: " + ex.getMessage());
	            return false;
	        }
	    }
	}
