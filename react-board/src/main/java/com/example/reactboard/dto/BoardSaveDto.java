package com.example.reactboard.dto;

import com.example.reactboard.entity.BoardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardSaveDto {
    private int bdNo;
    private String bdTitle;
    private String bdContent;
    private LocalDateTime bdDate;
    private int bdViews;

    public BoardEntity toEntity() {
        return BoardEntity.builder()
                .bdNo(bdNo)
                .bdTitle(bdTitle)
                .bdContent(bdContent)
                .bdDate(bdDate)
                .bdViews(bdViews)
                .build();
    }
}
