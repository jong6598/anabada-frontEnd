import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { postApi } from "../shared/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';


const Pdview = () => {





    return (
        <>
            <Title>날씨도 좋고 이래저래서</Title>

            <UserBox>
                <img src="/heart.png" alt="" />
                <PostName>작성자: 바람따라_파도따라</PostName>
                <span>15:23</span>
            </UserBox>
            <ThumbnailDiv>
                <img src="/heart.png" alt="heartlogo" />
            </ThumbnailDiv>
            <AddressBox>
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 6.3335C0.5 3.29592 2.96242 0.833496 6 0.833496C9.03758 0.833496 11.5 3.29592 11.5 6.3335C11.5 8.67736 10.1577 10.8746 8.88838 12.4401C8.24605 13.2323 7.60492 13.884 7.12456 14.3376C6.88407 14.5648 6.68307 14.743 6.54128 14.8652C6.47036 14.9264 6.41419 14.9735 6.37523 15.0058C6.35575 15.0219 6.34057 15.0344 6.32998 15.043L6.3176 15.053L6.31407 15.0559L6.31298 15.0568L6.31261 15.0571C6.31247 15.0572 6.31235 15.0573 6 14.6668C5.68765 15.0573 5.68753 15.0572 5.68739 15.0571L5.68702 15.0568L5.68593 15.0559L5.6824 15.053L5.67002 15.043C5.65943 15.0344 5.64425 15.0219 5.62477 15.0058C5.58581 14.9735 5.52964 14.9264 5.45872 14.8652C5.31693 14.743 5.11593 14.5648 4.87544 14.3376C4.39508 13.884 3.75396 13.2323 3.11162 12.4401C1.84231 10.8746 0.5 8.67736 0.5 6.3335ZM6 14.6668L5.68765 15.0573C5.87026 15.2034 6.12974 15.2034 6.31235 15.0573L6 14.6668ZM6 14.0105C6.11918 13.9056 6.26783 13.7713 6.43794 13.6106C6.89508 13.1789 7.50396 12.5597 8.11162 11.8103C9.34231 10.2924 10.5 8.32297 10.5 6.3335C10.5 3.84821 8.48529 1.8335 6 1.8335C3.51471 1.8335 1.5 3.84821 1.5 6.3335C1.5 8.32297 2.65769 10.2924 3.88838 11.8103C4.49604 12.5597 5.10492 13.1789 5.56206 13.6106C5.73217 13.7713 5.88081 13.9056 6 14.0105Z" fill="#007AFF" />
                </svg>
                <span>강원도 양양군 현북면</span>
            </AddressBox>
            <Amenity>
                <label>시설정보</label>
                <button>샤워시설이 있어요</button>
                <button>에어건이 있어요</button>
                <button>물도 있어요</button>
                <button>샵도 있어요</button>
                <button>다 있어요</button>
            </Amenity>
            <PostBox>
                <Viewer/>
            </PostBox>
            <HeartBtn onClick={null}>
                <EmptyHeartSvg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.4375 5.125C0.4375 2.53618 2.53617 0.4375 5.125 0.4375C6.45079 0.4375 7.64792 0.988282 8.5 1.87203C9.35208 0.988282 10.5492 0.4375 11.875 0.4375C14.4638 0.4375 16.5625 2.53618 16.5625 5.125C16.5625 7.40357 15.2251 9.50746 13.6341 11.1142C12.0376 12.7265 10.0893 13.9369 8.67739 14.4061C8.56223 14.4444 8.43777 14.4444 8.32261 14.4061C6.91068 13.9369 4.96241 12.7265 3.36593 11.1142C1.77492 9.50746 0.4375 7.40357 0.4375 5.125ZM5.125 1.5625C3.15749 1.5625 1.5625 3.1575 1.5625 5.125C1.5625 6.97144 2.66258 8.80503 4.16532 10.3226C5.59122 11.7626 7.29324 12.8295 8.5 13.2762C9.70676 12.8295 11.4088 11.7626 12.8347 10.3226C14.3374 8.80503 15.4375 6.97144 15.4375 5.125C15.4375 3.1575 13.8425 1.5625 11.875 1.5625C10.6706 1.5625 9.60558 2.15966 8.95991 3.07654C8.85455 3.22616 8.68299 3.31518 8.5 3.31518C8.31701 3.31518 8.14545 3.22616 8.04009 3.07654C7.39442 2.15966 6.32941 1.5625 5.125 1.5625Z" fill="#FF2D55" />
                </EmptyHeartSvg>
                <label htmlFor="heart">좋아요</label>
            </HeartBtn>
            <CommentBox>
                <CountBox>
                    <span> 댓글 {}개</span>
                    <span> 좋아요 {}개</span>
                </CountBox>
                <WriteComment>
                        <img src="/heart.png" alt="" />
                    <div>
                        <input type="text" placeholder="댓글을 입력해주세요." />
                        <button type="submit" onClick={null}>게시</button>
                    </div>
                </WriteComment>
                <ViewComments>
                    <img src="/emptyheart.png" alt="" />
                    <Comments>
                        <CommentsNick>닉네임</CommentsNick>
                        <CommentsCreateAt>2022.08.12</CommentsCreateAt>
                        <CommentsContent>주변에 볼것도 많고 좋네요!</CommentsContent>
                    </Comments>
                </ViewComments>
            </CommentBox>
        </>
    )
}


export default Pdview;



const Title = styled.span`
    font-size: 1.3rem;
    font-weight: 600;
`

const UserBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9375rem;
    img{
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 1rem;
    }
    span{
        padding-left: 0.3125rem;

    }
`

const PostName = styled.span`
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1rem;
    padding-right: 0.3125rem;
    border-right: 0.0625rem solid #C7C7CC;

`

const ThumbnailDiv = styled.div`
    display: flex;
    align-items: center;
    height: 32.6875rem;
    width: 100%;
    background-color: aliceblue;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    img{
        height: 100%;
        width: 100%;
    }
`



const AddressBox = styled.div`
    display: flex;
    align-items: center;
    height: 2.875rem;
    width: 100%;
    padding: 0.9375rem, 1rem, 0.9375rem, 1rem;

    span{
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.0625rem;
        color: #8E8E93;
        padding:0.53rem;
    }
    svg{
        height: 0.895833rem;
        width: 0.6875rem;
        background-color: blue;
    }
`

const Amenity = styled.div`
    display: flex;
    flex-direction: column;
    label{
        height: 2.375rem;
        width: 100%;
        top: 44.4375rem;
        border-radius: none;
        padding: 0.625rem, 1rem, 0.625rem, 1rem;     
    }
`

const PostBox = styled.div`
    height: 54.125rem;
    /* width: 29.375rem; */
    width: 100%;
    top: 55.625rem;
    padding: 1rem, 1rem, 1,5rem, 1rem;
`


const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
`

const CountBox = styled.div`
    display: flex;
    align-items: center;
    height: 2.5rem;
    width: 100vw;
    left: 0rem;
    top: 114.8125rem;
    border-radius: 0rem;
    padding: 0.625rem, 1rem, 0.625rem, 1rem;
    span{
        font-size: 0.8125rem;
        line-height: 1.25rem;
        letter-spacing: 0rem;
        margin-right: 1rem;
    }
`


const WriteComment = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.5625rem;
    height: 3.125rem;
    width: 100%;
    left: 0rem;
    top: 117.3125rem;
    border-radius: 0rem;
    padding: 0.5rem, 1rem, 0.5rem, 1rem;
    div{
        display: flex;
        align-items: center;
        flex-grow: 1;
        justify-content: space-between;
        background-color: #F2F2F7;
        height: 2.125rem;
        border: 0rem;
        border-radius: 1rem;
        padding: 0.625rem;
        padding-right: 1rem;
    }
    img{
        height: 2.125rem;
        width: 9vw;
        left: 0px;
        top: 0rem;
        border-radius: 1rem;
        margin-right: 0.5rem;
    }
    input{
      flex: 1;
      background-color: transparent;
      border: none;
      outline: none;
    }
    button{
        border-radius: 1rem;
        border: none;
        font-size: 0.75rem; 
        font-weight: 400;
    }

`
const ViewComments = styled.div`
    display: flex;
    height: 36.75rem;
    /* width: 29.375rem; */
    width:100%;
    top: 120.4375rem;
    border-radius: none;
    padding: 0rem, 1rem, 0rem, 1rem;
    img{
        height: 2rem;
        width: 9vw;
        left: 0px;
        top: 0px;
        border-radius: 1rem;
        margin-right: 0.5rem;
    }
`


const Comments = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;

`

const CommentsNick = styled.span`
    font-size: 0.75rem;
    line-height: 1.1875rem;
    color: black;
`

const CommentsCreateAt = styled.span`
    font-size: 0.75rem;
    line-height: 1.1875rem;
    font-weight: 300;
    color: #AEAEB2;
    `

const CommentsContent = styled.span`
    font-size: 0.875rem;
    line-height: 1.1875rem;
    color: black;
`

const HeartBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 2rem;
    width: 100%;
    border-radius: 0.25rem;
    border: 0rem;
    background-color: #EFF7FF;
    padding: 0.0625rem, 0.625rem, 0.0625rem, 0.625rem;
    /* img{
        height: 0.8758326875rem;
        width: 1rem;
        left: 0.05859375rem;
        top: 0.15234375rem;
        border-radius: 0rem;
        margin-right: 0.43375rem;
    } */
    label{
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1.25rem;
        letter-spacing: 0rem;
        text-align: left;

    }
  `

    const EmptyHeartSvg = styled.svg`
        background-color: transparent;
    `