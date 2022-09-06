import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postApi } from "../shared/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FiMoreHorizontal } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { queryKeys } from "../react-query/constants";
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";


const Comment = ({ comment }) => {
  const [updateContent, setUpdateContent] = useState(comment.content);
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const nickname = useSelector((state) => state.auth.nickname)

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //댓글 수정 
  const startEditing = () => {
    setEditing((prev) => !prev)
    console.log("수정모드!")
  }

  const onShowModal = () => {
    setShowModal((prev) => !prev);
  };


  //댓글 수정완료 button 클릭시 작동할 axios 함수
  const editcomments = async (updateContent) => {
    try {
      await postApi.updateComments(`${comment.commentId}`, updateContent)
      alert("댓글 수정완료")
    } catch (err) {
      alert(err);
    }
  }

  const editCommentMutation = useMutation(editcomments, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.commentList])
      setEditing((prev) => !prev)
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })

  const onRequestChat = (nickname) => {
    navigate(`/chat/${nickname}`);
  };

  //댓글 삭제
  const deletecomments = async () => {
    const result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
      try {
        await postApi.deleteComments(`${comment.commentId}`);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const commentDeleteMutation = useMutation(deletecomments, {
    onSuccess: () => {
      return (queryClient.invalidateQueries([queryKeys.commentList]),
      queryClient.invalidateQueries([queryKeys.detailPost]))
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })


  return (

    <ViewComments>
      <img src={comment.profileImg} alt="" />
      {editing ? (
        <>
          <Comments>
            <CommentsNick>{comment.nickname}</CommentsNick>
            <CommentsCreateAt>{comment.createdAt}</CommentsCreateAt>
            <UpdateContent type="text" value={updateContent} onChange={e => { setUpdateContent(e.target.value) }} required></UpdateContent>
          </Comments>
          <BtnDiv>
            <button onClick={() => {
              const updateComment = {
                content: updateContent
              }
              editCommentMutation.mutate(updateComment)
            }}>수정 완료</button>
            <button onClick={startEditing}>취소</button>
          </BtnDiv>
        </>
      ) : (
        <>
          <Comments>
            <CommentsNick>{comment.nickname}</CommentsNick>
            <CommentsCreateAt>{comment.createdAt}</CommentsCreateAt>
            <CommentsContent>{comment.content}</CommentsContent>
          </Comments>
          {comment.nickname !== nickname ? 
            <button
            className="chatBtn"
            onClick={() => onRequestChat(comment.nickname)}
          >
            <BsFillChatDotsFill />
          </button>
         :(<button className="moreBtn" onClick={onShowModal}>
                <FiMoreHorizontal />
              </button>
               )}
            {showModal&&(
              <SelectContainer>
              <div
                className="editBtn"
                onClick={() => {
                  setUpdateContent(comment.content);
                  startEditing()
                }}
              >
                수정하기
                <FiEdit2 />
              </div>
              <div
                className="deleteBtn"
                onClick={() => commentDeleteMutation.mutate(comment.commentId)}
              >
                삭제하기
                <RiDeleteBin5Line />
              </div>
            </SelectContainer>
            )}
            
           
        </>
      )}
    </ViewComments>)


}


export default Comment;


const UpdateContent = styled.input`
      background-color: #F2F2F7;
      border: none;
      border-radius: 1rem;
      height: 2.125rem;
      outline: none;
      padding-left: 0.625rem;
      font-size: 0.75rem; 
      font-weight: 300;
`


const ViewComments = styled.div`
    display: flex;
    position: relative;
    height: auto;
    width:100%;
    border-radius: none;
    padding: 0rem, 1rem, 0rem, 1rem;
    border-bottom: 0.05rem solid #E5E5EA;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;

    img{
      height: 2rem;
      width: 2rem;
      border-radius: 1rem;
      margin-right: 0.5rem;
    }

    .chatBtn{
      svg{
        color: #007AFF;
      }
    }
    
`

const BtnDiv = styled.div`
      display: flex;
      position: absolute;
      right: 0;
      button {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 0.75rem; 
        font-weight: 400;
        height: 2.125rem;
        border:  0.0625rem solid #E5E5EA;
        border-radius: 1.9375rem;
        
    }
`

const Comments = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
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

const SelectContainer = styled.div`
  position: absolute;
  z-index: 99;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  border-radius: 4px;
  color: rgb(61, 61, 61);
  bottom: auto;
  top: 2.5rem;
  left: auto;
  right: 0;
  transform: none;
  font-weight: bold;
  box-sizing: border-box;
  .editBtn {
    border-bottom: 1px solid #ececec;
  }
  .deleteBtn {
    color: #f54e4e;
  }
  div {
    display: flex;
    align-items: center;

    font-weight: bold;
    color: gray;
    white-space: nowrap;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    box-sizing: border-box;
    svg {
      margin-left: 0.5rem;
    }
  }
`;