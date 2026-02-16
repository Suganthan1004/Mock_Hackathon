package com.university.universityportal.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.university.universityportal.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
