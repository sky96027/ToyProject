/* BoardList.js */
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
        const resp = await (await axios.get('//localhost:8080/board')).data;
        setBoardList(resp.data);
        console.log(boardList);

        const pngn = resp.pagination;
        console.log(pngn);
    }

    useEffect(() => {
        getBoardList();
    }, []);

    return (
        <div>
            <ul>
                {boardList.map((board) => (
                    <li key={board.bdNo}>
                        <Link to ={`/board/$board.bdNo`}>{board.bdTitle}</Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default BoardList;