package com.example.reactboard.service;

import com.example.reactboard.dto.BoardSaveDto;
import com.example.reactboard.entity.BoardEntity;
import com.example.reactboard.repository.BoardRepository;
import com.example.reactboard.util.Header;
import com.example.reactboard.util.Pagination;
import com.example.reactboard.util.Search;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service("BoardService")
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    private static final Logger logger = LoggerFactory.getLogger(BoardServiceImpl.class);

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Header<List<BoardEntity>> getBoardList(int page, int size, Search search) {
        try {
            HashMap<String, Object> paramMap = new HashMap<>();
            long boardCount = boardRepository.count();
            if (page <= 1) {    //페이지가 1 이하로 입력되면 0으로 고정,
                paramMap.put("page", 0);
            } else {            //페이지가 2 이상
                paramMap.put("page", (page - 1) * size);
            }
            paramMap.put("size", size);
            paramMap.put("sk", search.getSk());
            paramMap.put("sv", search.getSv());

            List<BoardEntity> boardList = boardRepository.findAll();
            Pagination pagination = new Pagination(
                    (int) boardCount,      // 연습 프로젝트이기 때문에 long대신 int 사용
                    page,
                    size,
                    10
            );
            logger.info("[SUCCESS] getBoardList Success, Board count: " + boardCount);
            return Header.OK(boardList, pagination);
        } catch (Exception e) {
            logger.error("[ERROR] Exception : {}", e);
            return Header.ERROR("게시글 목록 조회 중 오류가 발생했습니다. ", e.getMessage());
        }
    }

    @Override
    public Header<BoardEntity> getBoardOne(int bdNo) {
        try {
            Optional<BoardEntity> optionalBoard = boardRepository.findById(bdNo); // here

            BoardEntity boardEntity = optionalBoard.orElse(null);

            logger.info("[SUCCESS] getBoardOne : " + boardEntity);
            return optionalBoard.map(Header::OK).orElseGet(() -> Header.ERROR("게시글 조회 중 오류가 발생했습니다.", "게시글 번호: " + bdNo));
        } catch (Exception e) {
            logger.error("[ERROR] Exception : {}", e);
            return Header.ERROR("게시글 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }
    @Transactional(rollbackFor = Exception.class)
    @Override
    public Header<BoardEntity> insertBoard(BoardSaveDto boardSaveDto){
        try {
            BoardEntity boardEntity = boardSaveDto.toEntity();
            boardRepository.save(boardEntity);

            logger.info("[SUCCESS] insertBoard : " + boardEntity.getBdNo());
            return Header.OK(boardEntity);
        } catch (Exception e) {
            logger.error("[ERROR] Exception : {}", e);
            return Header.ERROR("게시글 생성 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    @Override
    public Header<BoardEntity> updateBoard(BoardSaveDto boardSaveDto) {
        try {
            int bdNo = boardSaveDto.getBdNo();
            Optional<BoardEntity> optionalBoard = boardRepository.findById(bdNo);

            if (optionalBoard.isPresent()) {
                BoardEntity boardEntity = optionalBoard.get();
                boardEntity.setBdTitle(boardSaveDto.getBdTitle());
                boardEntity.setBdContent(boardSaveDto.getBdContent());
                boardEntity.setBdDate(LocalDateTime.now()); // 현재 날짜와 시간으로 설정

                boardRepository.save(boardEntity);

                logger.info("[SUCCESS] updateBoard : " + bdNo);
                return Header.OK(boardEntity);
            } else {
                logger.error("[ERROR] Board not found with bdNo: {}", bdNo);
                return Header.ERROR("해당 번호의 게시글을 찾을 수 없습니다.", "게시글 번호: " + bdNo);
            }
        } catch (Exception e) {
            logger.error("[ERROR] Exception : {}", e);
            return Header.ERROR("게시글 수정 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    @Override
    public Header<String> deleteBoard(int bdNo) {
        try {
            Optional<BoardEntity> optionalBoard = boardRepository.findById(bdNo);

            if (optionalBoard.isPresent()) {
                BoardEntity boardEntity = optionalBoard.get();

                boardRepository.delete(boardEntity);

                logger.info("[SUCCESS] updateBoard : " + bdNo);
                return Header.OK("게시글이 성공적으로 삭제되었습니다.");
            } else {
                logger.error("[ERROR] Board not found with bdNo: {}", bdNo);
                return Header.ERROR("해당 번호의 게시글을 찾을 수 없습니다.", "게시글 번호: " + bdNo);
            }
        } catch (Exception e) {
            logger.error("[ERROR] Exception : {}", e);
            return Header.ERROR("게시글 삭제 중 오류가 발생했습니다. 게시글 번호 : " + bdNo, e.getMessage());
        }
    }
}
