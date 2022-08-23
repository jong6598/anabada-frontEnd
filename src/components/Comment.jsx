import styled from "styled-components";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { postApi } from "../shared/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";


const Comment=({data}) => {
    const [updateContent, setUpdateContent] = useState(data.content);
    const params = useParams();
    const [editing, setEditing] = useState(false);
    const queryClient = useQueryClient();
    const nickname = useSelector((state)=>state.auth.nickname)


  console.log(data)
  console.log(params)
  
  //댓글 수정 
  //editing 상태에 따라 댓글 수정 input button 랜더링
  const startEditing = () => {
      setEditing((prev) => !prev)
      console.log("수정모드!")
  }

  //댓글 수정완료 button 클릭시 작동할 axios 함수
  const editcomments = async() => {
      const content={
        content: updateContent,
      }
      try {
        await postApi.updateComments(`${data.commentId}`, content)
        console.log("댓글 수정완료")
        }catch(err) {
          alert(err);
          console.log(err);
      }
  }

  const commentEditMutation = useMutation(editcomments, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"])
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })



  //댓글 삭제
  const deletecomments = async () => {
    const result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
        try {
          await postApi.deleteComments(`${data.commentId}`);
        } catch (err) {
          console.log(err);
          alert(err);
        }
      }  
      // else {
      //   queryClient.invalidateQueries(["post"])
      // }
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
       <img src={data.profileImg} alt="" />
        {editing? (
          <>
          <Comments>
            <CommentsNick>{data.nickname}</CommentsNick>
            <CommentsCreateAt>{data.createdAt}</CommentsCreateAt>
            <UpdateContent  type="text" value={updateContent} onChange={e => { setUpdateContent(e.currentTarget.value) }} required></UpdateContent>
          </Comments>
          <BtnDiv>
           <button onClick={editcomments}>수정 완료</button>
           <button onClick={startEditing}>취소</button>
          </BtnDiv>
          </>
          ):(
          <>
            <Comments>
              <CommentsNick>{data.nickname}</CommentsNick>
              <CommentsCreateAt>{data.after}</CommentsCreateAt>
              <CommentsContent>{data.content}</CommentsContent>
            </Comments>
            {data.nickname === nickname && (
              <BtnDiv>
                <button onClick={startEditing}>수정</button>
                <button onClick={deletecomments}>삭제</button>
              </BtnDiv>
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