import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAddMeet } from '../react-query/hooks/useAddMeet';

const MeetAdd = () => {
  const navigate = useNavigate();

  const [area, setArea] = useState('ALL');

  const onAdd = useAddMeet();

  const titleRef = useRef();
  const areaRef = useRef();
  const adressRef = useRef();
  const goalMemberRef = useRef();
  const imageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  return (
    <Container>
      <div>
        <p>제목</p>
        <input type="text" ref={titleRef} />
      </div>
      <div>
        <p>장소</p>
        <input type="text" ref={adressRef} />
      </div>
      <div>
        <p>모집 인원</p>
        <input type="text" ref={goalMemberRef} />
      </div>
      <div>
        <p>시작일</p>
        <input type="date" ref={startDateRef} />
        <p>종료일</p>
        <input type="date" ref={endDateRef} />
      </div>
      <div>
        <p>썸네일</p>
        <input type="file" ref={imageRef} />
      </div>
      <div>
        <p>지역</p>
        <select
          name="area"
          id="area"
          ref={areaRef}
          onChange={setArea}
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
        <p>모임 상세 내용</p>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div>
        <button onClick={() => navigate(-1)}>취소</button>
        <button
          onClick={() => {
            const post = {
              title: titleRef.current.value,
              area: areaRef.current.value,
              address: adressRef.current.value,
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
          등록
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0;

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
  }
  button {
    background-color: black;
    color: white;
    margin: 0 1rem;
    padding: 1rem;
  }
`;

export default MeetAdd;
