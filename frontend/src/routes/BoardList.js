/* BoardList.js */
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const BoardList = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [curPage, setCurPage] = useState(0); //현재 페이지 세팅
    const [prevBlock, setPrevBlock] = useState(0); //이전 페이지 블록
    const [nextBlock, setNextBlock] = useState(0); //다음 페이지 블록
    const [lastPage, setLastPage] = useState(0); //마지막 페이지

    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

    const getBoardList = async () => {
        if (search.page === curPage) return;

        const queryString = Object.entries(search)
            .map((e) => e.join('='))
            .join('&');

        const resp = await (await axios.get('//localhost:8080/board?'+ queryString)).data;
        console.log("resp : " + resp + " queryString : " + queryString);

        setBoardList(resp.data);
        const pngn = resp.pagination;

        const { endPage, nextBlock, prevBlock, startPage, totalPageCnt } = pngn;

        setCurPage(search.page);
        setPrevBlock(prevBlock);
        setNextBlock(nextBlock);
        setLastPage(totalPageCnt);

        const tmpPages = [];
        for (let i = startPage; i <= endPage; i++) {
            tmpPages.push(i);
        }

        setPageList(tmpPages);
    }

    const moveToWrite = () => {
        navigate('/write');
    };

    const onClick = (event) => {
        let value = event.target.value;
        setSearch({
            ...search,
            page: value,
        });

        getBoardList();
    };

    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setSearch({
            ...search,
            [name]: value,
        });
    };

    const onSearch = () => {
        if (search.sk !== '' && search.sv !== '') {
            setSearch({
                ...search,
                page: 1,
            });
            setCurPage(0);
            getBoardList();
        }
    };

    useEffect(() => {
        getBoardList();
    }, [search]);

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Writer</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {boardList.map((board, index) => (
                    <tr key={index}>
                        <td>{board.bdNo}</td>
                        <td><Link to={`/board/${board.bdNo}`}>{board.bdTitle}</Link></td>
                        <td>{board.writer}</td>
                        <td>{board.bdDate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div>
                <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button variant="secondary" onClick={onClick} value={1}>&lt;&lt;</Button>
                        <Button variant="secondary" onClick={onClick} value={prevBlock}>&lt;</Button>
                        {pageList.map((page, index) => (
                            <Button variant="secondary" key={index} onClick={onClick} value={page}>
                                {page}
                            </Button>
                        ))}
                        <Button variant="secondary" onClick={onClick} value={nextBlock}>&gt;</Button>
                        <Button variant="secondary" onClick={onClick} value={lastPage}>&gt;&gt;</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
            <br/>

            <div>
                <Form.Select aria-label="Default select example" name="sk" onChange={onChange}>
                    <option value="">선택</option>
                    <option value="bdTitle">제목</option>
                    <option value="bdContent">내용</option>
                </Form.Select>
                <input type="text" name="sv" id="" onChange={onChange}/>
                <button onClick={onSearch}>검색</button>

            </div>
            <br/>
            <div>
                <button onClick={moveToWrite}>글쓰기</button>
            </div>
        </div>
    );
};

export default BoardList;