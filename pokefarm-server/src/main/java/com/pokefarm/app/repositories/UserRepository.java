package com.pokefarm.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pokefarm.app.models.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {}
