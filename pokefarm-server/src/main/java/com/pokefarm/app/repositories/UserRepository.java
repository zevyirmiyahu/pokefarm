package com.pokefarm.app.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pokefarm.app.entities.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer> {}
