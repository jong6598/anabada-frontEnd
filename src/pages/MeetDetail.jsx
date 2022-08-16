import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useQuery } from '@tanstack/react-query';

import { meet as data } from '../data';

const getMeetPost = async () => {
  try {
    const res = await meetsApi.getMeetDetail();
    if (res.status === 200) {
      console.log('Okay success get meet detail');
      return res.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.log('404 Error');
    }
  }
};

const MeetDetail = () => {
  // FIXME: const { data } = useQuery(['meet'], getMeetPost);

  return (
    <Container>
      <div>
        <p>모임 정보</p>
        <img src={data.thumbnailUrl} alt="thumbnail" />
        <p>{data.title}</p>
        <p>{data.place}</p>
        <p>{data.goalMember}</p>
        <p>
          {data.startDate} {data.endDate}
        </p>
        <p>모집중</p>
      </div>
      <div>
        <p>참여 회원</p>
        <ul>
          {data.members.map((member) => {
            return (
              <MemberInfo key={member.email}>
                <img src={member.profileUrl} alt="" />
                <p>{member.nickname}</p>
              </MemberInfo>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

const Container = styled.div``;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
`;
export default MeetDetail;
