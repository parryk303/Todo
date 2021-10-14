package com.parryk.springbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parryk.springbackend.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(boolean completed);
    List<Todo> findByTitleContaining(String title);
}
