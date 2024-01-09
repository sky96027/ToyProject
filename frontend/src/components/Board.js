/* Board.js */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Board = ({ bdNo, bdTitle, bdDate, bdContent }) => {
    const navigate = useNavigate();
    const moveToUpdate = () => {
        navigate('/update/' + bdNo);
    };

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/board/${bdNo}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    };

    const moveToList = () => {
        navigate('/board');
    };

    return (
        <div>
            <div>
                <h2>{bdTitle}</h2>
                <h5>{bdDate}</h5>
                <hr/>
                <p>{bdContent}</p>
            </div>
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={deleteBoard}>삭제</button>
                <button onClick={moveToList}>목록</button>
            </div>
        </div>
    );
};

export default Board;