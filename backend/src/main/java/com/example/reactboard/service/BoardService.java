package com.example.reactboard.service;

import com.example.reactboard.dto.BoardSaveDto;
import com.example.reactboard.entity.BoardEntity;
import com.example.reactboard.util.Header;
import com.example.reactboard.util.Search;

import java.util.List;

public interface BoardService {

    Header<List<BoardEntity>> getBoardList(int page, int size, Search search);

    Header<BoardEntity> getBoardOne(int bdNo);

    Header<BoardEntity> insertBoard(BoardSaveDto boardSaveDto);

    Header<BoardEntity> updateBoard(BoardSaveDto boardSaveDto);

    Header<String> deleteBoard(int bdNo);

}
