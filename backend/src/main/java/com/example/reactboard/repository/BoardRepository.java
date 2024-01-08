package com.example.reactboard.repository;

import com.example.reactboard.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    @Query("SELECT MAX(b.bdNo) FROM BoardEntity b")
    Integer findMaxBdNo();
}
