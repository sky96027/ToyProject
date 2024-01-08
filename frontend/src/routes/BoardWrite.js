/* BoardWrite.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        bdTitle: '',
        bdContent: '',
    });

    const { bdTitle, bdContent} = board; //비구조화 할당

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        await axios.post(`//localhost:8080/board`, board).then((res) => {
            alert('등록되었습니다.');
            navigate('/board');
        });
    };

    const backToList = () => {
        navigate('/board');
    };

    return (
        <div>
            <div>
                <span>제목</span>
                <input type="text" name="bdTitle" value={bdTitle} onChange={onChange}/>
            </div>
            <br/>
            <div>
                <span>내용</span>
                <textarea name="bdContent" cols="30" rows="10" value={bdContent} onChange={onChange}></textarea>
            </div>
            <br/>
            <div>
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>취소</button>
            </div>
        </div>
    );
};

export default BoardWrite;