import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAddMeet } from '../react-query/hooks/useAddMeet';

const MeetAdd = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // navgiation으로 전달받음
  const [isEdit, setIsEdit] = useState(false);

  const onAdd = useAddMeet(isEdit);

  useEffect(() => {
    if (state) {
      // 기존의 post가 있다면
      const startDate = state.startDate.replaceAll('.', '-');
      const endDate = state.endDate.replaceAll('.', '-');
      const editedState = { ...state, startDate, endDate };

      setIsInputValue(editedState);
      setIsEdit(true); // edit 체크
    }
  }, []);

  const [isInputValue, setIsInputValue] = useState({
    title: '',
    content: '',
    area: '서울·경기·인천',
    address: '',
    goalMember: '',
    thumbnailUrl: '',
    startDate: '',
    endDate: ''
  });

  const {
    thunderPostId,
    title,
    content,
    area,
    address,
    goalMember,
    thumbnailUrl,
    startDate,
    endDate
  } = isInputValue;

  const onChange = (e) => {
    setIsInputValue({
      ...isInputValue,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <div>
        <p>제목</p>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          onChange={onChange}
          value={title}
        />
      </div>
      <div>
        <p>지역</p>
        <select name="area" id="area" onChange={onChange} value={area}>
          <option value="서울·경기·인천">서울·경기·인천</option>
          <option value="강원">강원</option>
          <option value="대구·경북">대구·경북</option>
          <option value="부산·울산·경남">부산·울산·경남</option>
          <option value="전북">전북</option>
          <option value="광주·전남">광주·전남</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="제주">제주</option>
        </select>
      </div>
      <div>
        <p>위치 정보</p>
        <input type="text" name="address" onChange={onChange} value={address} />
      </div>
      <div>
        <p>모집 인원</p>
        <input
          type="text"
          name="goalMember"
          onChange={onChange}
          value={goalMember}
        />
      </div>
      <div>
        <p>시작일</p>
        <input
          type="date"
          name="startDate"
          onChange={onChange}
          value={startDate}
        />
      </div>
      <div>
        <p>종료일</p>
        <input type="date" name="endDate" onChange={onChange} value={endDate} />
      </div>
      <div>
        <p>썸네일</p>
        <input
          type="file"
          name="thumbnailUrl"
          onChange={onChange}
          //FIXME: value={thumbnailUrl}
        />
      </div>
      <div>
        <p>모임 상세 내용</p>
        <textarea
          onChange={onChange}
          className="textArea"
          name="content"
          id=""
          cols="30"
          rows="10"
          value={content}
        />
      </div>
      <button
        onClick={() => {
          const post = {
            title,
            content,
            area,
            address,
            goalMember,
            thumbnailUrl,
            startDate,
            endDate
          };
          const result = window.confirm('등록하시겠습니까?');
          if (result) {
            onAdd(post, thunderPostId);
          }
        }}
      >
        게시하기
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0;
  button {
    padding: 12px 10px;
    gap: 16px;
    background: linear-gradient(0deg, #007aff, #007aff), #ffffff;
    border-radius: 5px;
    color: #ffffff;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 139.34%;
      /* identical to box height, or 20px */
      letter-spacing: -0.01em;
      color: #000000;
      margin-bottom: 0.5rem;
    }
    input {
      padding: 12px 10px;
      gap: 16px;

      background: #ffffff;
      border: 1px solid #d1d1d6;
      border-radius: 5px;

      font-style: normal;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.063rem;
      /* identical to box height */
    }
    select {
      padding: 0.75rem 0.625rem;
      background: #ffffff;
      border: 1px solid #d1d1d6;
      border-radius: 5px;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.063rem;
      outline: none;
    }
  }

  .textArea {
    padding: 0.75rem 0.625rem;
    resize: none;
    background: #ffffff;
    border: 1px solid #d1d1d6;
    border-radius: 5px;
    font-weight: 400;
    outline: none;
  }
`;

export default MeetAdd;
