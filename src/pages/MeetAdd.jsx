import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAddMeet } from '../react-query/hooks/useAddMeet';

const MeetAdd = () => {
  const navigate = useNavigate();

  const [area, setArea] = useState('GYEONGGI');

  const onAdd = useAddMeet();

  const titleRef = useRef();
  const areaRef = useRef();
  const addressRef = useRef();
  const goalMemberRef = useRef();
  const imageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const contentRef = useRef();

  const onSelectArea = (e) => {
    setArea(e.target.value);
  };

  return (
    <Container>
      <div>
        <p>제목</p>
        <input type="text" ref={titleRef} placeholder="제목을 입력해주세요" />
      </div>
      <div>
        <p>지역</p>
        <select
          name="area"
          id="area"
          ref={areaRef}
          onChange={onSelectArea}
          value={area}
        >
          <option value="GYEONGGI">서울, 경기, 인천</option>
          <option value="GANGWON">강원</option>
          <option value="GYEONBUK">대구, 경북</option>
          <option value="GYEONGNAM">부산, 울산, 경남 </option>
          <option value="JEONBUK">전북</option>
          <option value="JEONNAM">광주, 전남</option>
          <option value="CHUNGBUK">충북</option>
          <option value="CHUNGNAM">충남</option>
          <option value="JEJU">제주</option>
        </select>
      </div>
      <div>
        <p>위치 정보</p>
        <input type="text" ref={addressRef} />
      </div>
      <div>
        <p>모집 인원</p>
        <input type="text" ref={goalMemberRef} />
      </div>
      <div>
        <p>시작일</p>
        <input type="date" ref={startDateRef} />
      </div>
      <div>
        <p>종료일</p>
        <input type="date" ref={endDateRef} />
      </div>
      <div>
        <p>썸네일</p>
        <input type="file" ref={imageRef} />
      </div>
      <div>
        <p>모임 상세 내용</p>
        <textarea
          className="textArea"
          id=""
          cols="30"
          rows="10"
          ref={contentRef}
        />
      </div>
      <button
        onClick={() => {
          const post = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            area: areaRef.current.value,
            address: addressRef.current.value,
            goalMember: goalMemberRef.current.value,
            thumbnailUrl: imageRef.current.value,
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value
          };
          const result = window.confirm('등록하시겠습니까?');
          if (result) {
            onAdd(post);
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

      outline: none;
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
