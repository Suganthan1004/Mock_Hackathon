package com.university.portal.repository;

import com.university.portal.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByOrderByDateDesc();

    List<Event> findByCategoryOrderByDateAsc(String category);
}
