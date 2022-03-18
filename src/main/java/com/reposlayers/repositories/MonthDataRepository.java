package com.reposlayers.repositories;


import com.reposlayers.models.MonthData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthDataRepository extends JpaRepository<MonthData, Integer> {
}
