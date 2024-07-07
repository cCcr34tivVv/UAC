package com.paw.uac.Service.interfaces;

public interface ITokenService {
    String generateJwtToken(int id);

    int decryptJwtToken(String token);
}
