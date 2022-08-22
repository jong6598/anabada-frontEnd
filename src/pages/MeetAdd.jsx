import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';

const MeetAdd = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const placeRef = useRef();
  const goalMemberRef = useRef();
  const imageRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const regionRef = useRef();

  const queryClient = useQueryClient();

  const addMeetPost = async (post) => {
    try {
      const res = await meetsApi.postMeetPost(post);
      console.log('Okay Add Meet Post');
      alert('모임 등록이 완료 되었습니다.');
      navigate(-1);
    } catch (error) {
      console.log(error.response);
      alert('모임 등록이 실패 했습니다.');
    }
  };

  const { mutate: onAdd } = useMutation(addMeetPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['meet']);
    },
    onError: (error) => {
      console.log(error.response);
    }
  });

  return (
    <Container>
      <div>
        <p>제목</p>
        <input type="text" ref={titleRef} />
      </div>
      <div>
        <p>장소</p>
        <input type="text" ref={placeRef} />
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
        <select name="region" id="region" ref={regionRef}>
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
              place: placeRef.current.value,
              goalMember: goalMemberRef.current.value,
              thumbnailUrl: imageRef.current.value,
              thumbnailFileName: ' ',
              startDate: startDateRef.current.value,
              endDate: endDateRef.current.value
              // FIXME: Add regionRef
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
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
  button {
    background-color: black;
    color: white;
    margin: 0 1rem;
    padding: 1rem;
  }
`;

export default MeetAdd;
