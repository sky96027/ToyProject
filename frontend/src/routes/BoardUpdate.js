/* BoardUpdate.js */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardUpdate = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        bdNo: 0,
        bdTitle: '',
        bdContent: '',
    });

    const { bdTitle, bdContent } = board; //비구조화 할당
    const { bdNo } = useParams();
    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const getBoard = async () => {
        const resp = await (await axios.get(`//localhost:8080/board/${bdNo}`)).data;
        setBoard(resp.data);
    };

    const updateBoard = async () => {
        await axios.patch(`//localhost:8080/board`, board).then((res) => {
            alert('수정되었습니다.');
            navigate('/board/' + bdNo);
        });
    };

    const backToDetail = () => {
        navigate('/board/' + bdNo);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            <div>
                <span>제목</span>
                <input type="text" name="bdTitle" value={bdTitle} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea
                    name="bdContent"
                    cols="30"
                    rows="10"
                    value={bdContent}
                    onChange={onChange}
                ></textarea>
            </div>
            <br />
            <div>
                <button onClick={updateBoard}>수정</button>
                <button onClick={backToDetail}>취소</button>
            </div>
        </div>
    );
};

export default BoardUpdate;