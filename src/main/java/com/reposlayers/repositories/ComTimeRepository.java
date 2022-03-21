package com.reposlayers.repositories;

import com.reposlayers.models.ComTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComTimeRepository extends JpaRepository <ComTime, Integer> {
}
