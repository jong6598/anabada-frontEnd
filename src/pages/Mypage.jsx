import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
    const profileImg = useSelector((state) => state.auth.profileImg)
    const nickname = useSelector((state) => state.auth.nickname)
    const navigate = useNavigate();


    return (
        <>
            <UserDiv>
                <img src={profileImg} alt="" />
                <button>사진수정하기</button>
                <span>{nickname}님</span>
            </UserDiv>
            <SelectDiv>
                <h1>게시물</h1>
                <button>내 작성글</button>
                <button>내 관심글</button>
                <AllBtn>전체보기</AllBtn>
                <LoadDiv>
                    <span>작성글1</span>
                    <span>작성글2</span>
                </LoadDiv>
            </SelectDiv>
            <SelectDiv>
                <h1>모임</h1>
                <button>모집한 모임</button>
                <button>참가한 모임</button>
                <AllBtn>전체보기</AllBtn>
                <LoadDiv>
                    <span>모임1</span>
                    <span>모임2</span>
                </LoadDiv>
            </SelectDiv>
        </>

    )
}

export default Mypage;

const UserDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;

    img{
      height: 2rem;
      width: 2rem;
      border-radius: 1rem;
    }
    button{
        background-color: aliceblue;
        border: 0.5rem solid blue;
        border-radius: 1rem;
    }
`
const SelectDiv = styled.div`
    position: relative;
    button{
        border : 0.3rem solid black;
        border-radius: 1rem;
    }
`


const LoadDiv = styled.div`
    display: flex;
    flex-direction: column;
    span{
        border: 0.5rem solid blue;
    }
`
const AllBtn= styled.div`
    position: absolute;
    border : 0.3rem solid black;
    border-radius: 1rem;
    right: 0;
    top: 0;
`