package com.boxy.reactcrudcomponent.repository;

import com.boxy.reactcrudcomponent.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
