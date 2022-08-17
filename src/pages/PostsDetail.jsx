import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { postApi } from "../shared/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PostsDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const nickname = localStorage.getItem("nickname");
  const [liked, setLiked] = useState();
  const queryClient = useQueryClient();
  const accesstoken = localStorage.getItem("accesstoken")

  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState('')



  const getPost = async () => {
    try {
      const res = await postApi.getPost(`${params.postId}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const postInfo = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  }).data.post;



  //북마크 기능구현
  const toggleLike = async () => {
    if (postInfo.isLiked === false) {
      try {
        await postApi.postLike(`${params.postId}`);
        console.log(postInfo.isLiked);
        setLiked(true);
      } catch (err) {
        console.log(err);
      }
    } else if (postInfo.isLiked === true) {
      try {
        await postApi.deleteLike(`${params.postId}`);
        console.log(postInfo.isLiked);
        setLiked(false);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };



  useEffect(() => {
    queryClient.invalidateQueries("post");
  }, [postInfo, liked]);



  //댓글 작성
  const submitComments = () => {
    console.log("댓글 등록완료")

  }



  //댓글 수정 
  //editing 상태에 따라 댓글 수정 input button 랜더링
  const startEditing = (comments) => {
    setEditing((prev) => !prev)
    //commentsId 이거를 체크해서 그 댓글만 인풋박스가 나오게 해야되넹....
    //수정하기를 누르면 인풋박스로 바뀌고 내용 박아주기.
    setInput(postInfo.comments.content)
  }

  //댓글 수정완료 button 클릭시 작동할 axios 함수
  const editcomments = () => {
    console.log("댓글 수정완료")
  }


  //댓글 삭제
  const deletecomments = async () => {
    const result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
      if (accesstoken !== null) {
        try {
          await postApi.deletecomments(`${params.commentId}`);
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



  return (
    <>
      <span>{postInfo.title}</span>
      <ProfileBox>
        <UserBox>
          <img src={postInfo.profileImg} alt="" />
          <span>작성자:{postInfo.nickname}</span>
          <span>{postInfo.createdAt}</span>
        </UserBox>
        <HeartBtn onClick={toggleLike}>
          {" "}
          {postInfo.isLiked === true ? (
            <img src="/image/heart.png" alt="heartlogo" />
          ) : (
            <img src="/image/emptyheart.png" alt="emptyheartlogo" />
          )}{" "}
        </HeartBtn>
        <img src={postInfo.thumbnailUrl} alt="" />
      </ProfileBox>
      <Amenity>
        <title>시설정보</title>

      </Amenity>

      <PostBox>
        <span>지역: {postInfo.area}</span>
        <span>{postInfo.content}</span>
      </PostBox>
      <CommentBox>
        <WriteComment>
          <input type="text" placeholder="댓글 내용을 입력하세요."
            onChange={e => { setComment(e.currentTarget.value) }}
            onKeyUp={e => {
              e.currentTarget.value.length > 0
                ? setIsValid(true)
                : setIsValid(false)
            }} />
          <button type="submit" disabled={isValid === false} onClick={submitComments}>등록하기</button>
        </WriteComment>
        <span>{postInfo.comments.profileImg}</span>
        <span>{postInfo.comments.nickname}</span>
        <span>{postInfo.comments.content}</span>
        <span>{postInfo.comments.createdAt}</span>
        {postInfo.comments.nickname === nickname ? (<><button onClick={startEditing}>수정</button><button onClick={() => deletecomments}>삭제</button></>)
          : null}
      </CommentBox>
    </>
  )
}







export default PostsDetail;


const ProfileBox = styled.div`

`

const PostBox = styled.div`

`

const UserBox = styled.div`

`

const Amenity = styled.div`

`


const CommentBox = styled.div`

`
const WriteComment = styled.div`

`



const HeartBtn = styled.button`
  max-width: 3rem;
  max-height: 6rem;
`