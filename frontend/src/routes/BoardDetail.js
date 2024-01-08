/* BoardDetail.js */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board'; // 수정된 import 문

const BoardDetail = () => {
    const { bdNo } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const resp = await (await axios.get(`http://localhost:8080/board/${bdNo}`)).data;
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            {loading ? (
                <h2>로딩 중...</h2>
            ) : (
                <Board
                    no={board.bdNo}
                    title={board.bdTitle}
                    content={board.bdContent}
                    date={board.bdDate}
                />
            )}
        </div>
    );
};

export default BoardDetail;