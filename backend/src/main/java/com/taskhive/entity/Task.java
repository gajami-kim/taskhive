package com.taskhive.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "task")
@Getter
@Setter
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;

    @Column(nullable = false)
    private long dashId;

    @Column(nullable = false)
    private String taskName;

    @Column(nullable = false)
    private String taskState;

    @Column(nullable = true)
    private String taskDate;

    @Column(nullable = true)
    private String taskTime;

    @Column(nullable = true)
    private String taskText;
}
