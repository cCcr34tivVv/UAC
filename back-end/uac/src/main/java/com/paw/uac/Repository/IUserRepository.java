package com.paw.uac.Repository;

import com.paw.uac.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM users WHERE username = ?1 AND password = ?2", nativeQuery = true)
    List<User> getByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT * FROM users WHERE id = ?1", nativeQuery = true)
    List<User> getById(int id);
}
