package com.taskhive.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dashboard")
@Getter
@Setter
@NoArgsConstructor
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dashId;

    @Column(nullable = false)
    private long id;

    @Column(nullable = false)
    private String dashName;

    @Column(nullable = true)
    private String dashBg;
}