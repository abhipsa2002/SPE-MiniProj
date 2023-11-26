package com.example.course_creation.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Course_Schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer scheduleId;
    @Column(name="time",nullable = false)
    private String time;
    @Column(name="day",nullable = false)
    private String day;
    @Column(name="room",nullable = false)
    private String room;
    @Column(name="building")
    private String building;

    @ManyToOne
    @JoinColumn(name="course_id")
    private course course;
}
