package com.paw.uac.Service.interfaces;

import com.paw.uac.Dto.RegisterDto;
import com.paw.uac.models.User;

public interface IUserService {
    int getUserByUsernameAndPassword(String username, String password);

    User getById(int id);

    void add (RegisterDto registerDto);

    void changePassword (int id, String password);

    void deleteUser(int id);
}
