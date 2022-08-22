import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { postApi, userAuth } from "../shared/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";


const Comment=({data}) => {
    const [updateContent, setUpdateContent] = useState(data.content);
    const params = useParams();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const queryClient = useQueryClient();
    const nickname = useSelector((state)=>state.userAuth.nickname)



  
  //댓글 수정 
  //editing 상태에 따라 댓글 수정 input button 랜더링
  const startEditing = (commentId) => {
    if (commentId===data.commentId) {
      setEditing((prev) => !prev)
    }
  }

  //댓글 수정완료 button 클릭시 작동할 axios 함수
  const editcomments = async(commentId) => {
    if (commentId===data.commentId){
      try {
        await postApi.updateComments(`${params.commentsId}`, updateContent)
        console.log("댓글 수정완료")
        }catch(err) {
          alert(err);
      }
    }
   
  }


  //댓글 삭제
  const deletecomments = async (commentId) => {
    const result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
      if (commentId===data.commentId) {
        try {
          await postApi.deleteComments(`${params.commentId}`);
          //FIXME:return navigate("/") 아니면 리프레시하는 동작
        } catch (err) {
          console.log(err);
          alert(err);
        }
      } else {
        alert("err");
        return navigate("/login");
      }
    }
  };

  const commentDeleteMutation = useMutation(deletecomments, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"])
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })


    return(

    <ViewComments>
        <span>{data.profileImg}</span>
        {editing? (
          <Comments>
            <CommentsNick>{data.nickname}</CommentsNick>
            <CommentsCreateAt>{data.createdAt}</CommentsCreateAt>
            <UpdateContent  type="text" value={updateContent} onChange={e => { setUpdateContent(e.currentTarget.value) }} required></UpdateContent>
            <button onClick={editcomments}>수정 완료</button>
            <button onClick={null}>취소</button>
          </Comments>
          ):(
          <>
            <Comments>
              <CommentsNick>{data.nickname}</CommentsNick>
              <CommentsCreateAt>{data.createdAt}</CommentsCreateAt>
              <CommentsContent>{data.content}</CommentsContent>
            </Comments>
            {data.nickname === nickname && (
              <>
                <button onClick={startEditing}>수정</button>
                <button onClick={commentDeleteMutation}>삭제</button>
              </>
            )}
            </>
          )}
      </ViewComments>)

    
}


export default Comment;


const UpdateContent = styled.input`
      height: 2rem;
      width: 9vw;
      left: 0px;
      top: 0px;
      border-radius: 1rem;
      margin-right: 0.5rem;
`


const ViewComments = styled.div`
    display: flex;
    height: auto;
    width:100%;
    margin-bottom: 10.25rem;
    border-radius: none;
    padding: 0rem, 1rem, 0rem, 1rem;
    span{
        height: 2rem;
        width: 9vw;
        left: 0px;
        top: 0px;
        border-radius: 1rem;
        margin-right: 0.5rem;
    }
    button {
        display: flex;
        cursor: pointer;
        font-size: 0.75rem; 
        font-weight: 400;
        height: 2.125rem;
        
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