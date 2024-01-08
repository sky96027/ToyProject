/* Board.js */
import React from 'react';

const Board = ({ no, title, date, content }) => {
    return (
        <div>
            <h2>{title}</h2>
            <h5>{date}</h5>
            <hr />
            <p>{content}</p>
        </div>
    );
};

export default Board;