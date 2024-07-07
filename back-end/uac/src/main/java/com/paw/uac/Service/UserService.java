package com.paw.uac.Service;

import com.paw.uac.Dto.RegisterDto;
import com.paw.uac.Repository.IUserRepository;
import com.paw.uac.Service.interfaces.IUserService;
import com.paw.uac.exception.EmailAlreadyExistsException;
import com.paw.uac.exception.UserDoesNotExistsException;
import com.paw.uac.exception.UsernameAlreadyExistsException;
import com.paw.uac.exception.UsernameOrPasswordIsIncorrectException;
import com.paw.uac.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public int getUserByUsernameAndPassword(String username, String password) {
        List<User> users = userRepository.getByUsernameAndPassword(username, password);
        if(users.isEmpty())
            throw new UsernameOrPasswordIsIncorrectException("Doesn't exists!");
        return users.get(0).getId();
    }

    @Override
    public User getById(int id){
        List<User> user = userRepository.getById(id);
        if(user.isEmpty())
            throw new UserDoesNotExistsException("Doesn't exists!");
        return user.get(0);
    }

    @Override
    public void add(RegisterDto registerDto) {
        try {
            User user = new User(0, registerDto.getUsername(), registerDto.getPassword(), registerDto.getEmail());
            userRepository.save(user);
            } catch (DataIntegrityViolationException exception) {
            if (exception.getMessage().contains("username")) {
                throw new UsernameAlreadyExistsException("USERNAME");
            }
            if (exception.getMessage().contains("email")) {
                throw new EmailAlreadyExistsException("EMAIL");
            }
        }
    }

    @Override
    public void changePassword(int id, String password) {
        if (!userRepository.existsById(id))
            throw new UserDoesNotExistsException("Nu i");

        User user = userRepository.getReferenceById(id);
        user.setPassword(password);

        userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        if(!userRepository.existsById(id))
            throw new UserDoesNotExistsException("Nu este");

        userRepository.deleteById(id);
    }
}
