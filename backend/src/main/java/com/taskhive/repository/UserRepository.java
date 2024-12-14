package com.taskhive.repository;

import com.taskhive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByNickname(String nickname);
}
