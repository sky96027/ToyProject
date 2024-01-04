package com.example.reactboard.controller;

import com.example.reactboard.dto.BoardSaveDto;
import com.example.reactboard.entity.BoardEntity;
import com.example.reactboard.service.BoardService;
import com.example.reactboard.util.Header;
import com.example.reactboard.util.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BoardController {
    private final Logger logger = LoggerFactory.getLogger(BoardController.class);

    private final BoardService boardService;
    @GetMapping("/board")
    Header<List<BoardEntity>> getBoardList(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            Search search
    ) {
        Header<List<BoardEntity>> response = boardService.getBoardList(page, size, search);

        return response;

    }

    @GetMapping("/board/{bdNo}")
    Header<BoardEntity> getBoardOne(@PathVariable(name = "bdNo") int bdNo) {
        Header<BoardEntity> response = boardService.getBoardOne(bdNo);

        if (response.getData() == null) {
            // 게시글이 존재하지 않는 경우 처리
            response.setResultCode("NOT_FOUND");
            response.setDescription("게시글이 존재하지 않습니다.");
        }

        return response;
    }

    @PostMapping("/board")
    Header<BoardEntity> insertBoard(@RequestBody BoardSaveDto boardSaveDto) {
        Header<BoardEntity> response = boardService.insertBoard(boardSaveDto);

        return response;
    }

    @PatchMapping("/board")
    Header<BoardEntity> updateBoard(@RequestBody BoardSaveDto boardSaveDto) {
        Header<BoardEntity> response = boardService.updateBoard(boardSaveDto);

        return response;
    }

    @DeleteMapping("/board/{bdNo}")
    Header<String> deleteBoard(@PathVariable(name = "bdNo") int bdNo) {
        Header<String> response = boardService.deleteBoard(bdNo);

        return response;
    }

}
