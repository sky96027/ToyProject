package com.example.reactboard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bd_no")
    private int bdNo;

    @Column(name = "bd_title")
    private String bdTitle;

    @Column(name = "bd_content")
    private String bdContent;

    @Column(name = "bd_date")
    private LocalDateTime bdDate;

    @Column(name = "bd_views")
    private int bdViews;

}
