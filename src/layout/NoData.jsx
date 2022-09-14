import styled from 'styled-components';
import { FiInbox } from 'react-icons/fi';

const NoData = ({ text, content, chat, notification }) => {
  return (
    <NoDataDiv>
      <div>
        <FiInbox />
        {chat ? (
          <p>{`${text}가 없습니다`}</p>
        ) : (
          <>
            <p>{`${text}이 없습니다`}</p>
            {!notification && <p>{`첫 ${content}을 작성해 보세요`}</p>}
          </>
        )}
      </div>
    </NoDataDiv>
  );
};

export default NoData;

export const NoDataMyPage = ({text, meet, post})=> {
  let title = ''
  switch(text){
    case 'myHostMeet':
    title='주최';
    break;
  case 'myJoinMeet':
    title='참석';
    break;
  case 'myLikeMeet':
    title='좋아요';
    break;
  case 'myWritePost':
    title='작성'
    break;
  case 'myLikePost':
    title='좋아요';
    break;
  default:
    title=''   
  }


  return(
    <NoDataDiv>
       <div>
        <FiInbox />
        {meet && <p>{`${title} 모임이 없습니다`}</p> } 
        {post && <p>{`${title}한 게시글이 없습니다`}</p> }
        </div>
    </ NoDataDiv>
  )
}


const NoDataDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    text-align: center;
    color: #8e8e93;
  }
  p {
    margin: 0.3rem 0;
    font-style: normal;
    font-weight: 400;
    font-size: 1.063rem;
    line-height: 1.5rem;
  }
  svg {
    color: #d9d9d9;
    font-size: 3rem;
  }
`;
