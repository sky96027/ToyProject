import React from 'react';

const Home = () => {
    const contentStyle = {
        height: '100vh',      // 화면 높이의 100%로 설정
        display: 'flex',      // 자식 엘리먼트들을 가로로 나열
        alignItems: 'center', // 자식 엘리먼트를 세로로 가운데 정렬
        justifyContent: 'center', // 자식 엘리먼트를 가로로 가운데 정렬
    };

    return (
        <div style={contentStyle}>
            <div>
                This place is home.
            </div>
        </div>
    );
};

export default Home;