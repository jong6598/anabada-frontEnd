import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm } from "react-hook-form";
import { meetsApi } from "../shared/api";
import { useSelector } from "react-redux";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants";


const MeetAdd = () => {
  const nickname = useSelector((state) => state.auth.nickname)
  const navigate = useNavigate();
  const thunderPostId = useParams().thunderPostId;
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState("");


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(()=>{
    if (thunderPostId) {
      const setMeet = async () => {
        const meetInfo = await meetsApi.getMeetDetail(`${thunderPostId}`);
        
      if(meetInfo.data.nickname !== nickname) {
        alert("수정 권한이 없습니다.");
        navigate(-1);
        return;
      }

     


      const data = meetInfo.data;
    
      setValue("title", data.title);
      setValue("area", data.area);
      setValue("address", data.address);
      setValue("createAt", data.createAt);
      setValue("endDate", data.endDate);
      setValue("meetDate", data.meetDate);
      setValue("goalMember", data.goalMember);
      setValue("content", data.content);
      setImgSrc(data.thumbnailUrl);
    }
    setMeet();
    }
  },[]);

  const previewImage = async (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };


  const onSubmitMeet = async (newMeet) => {
    if (!thunderPostId) {
      try {
        const post = await meetsApi.postMeetPost(newMeet);
        alert("모임이 등록되었습니다!");
      }catch (err) {
        alert(err)
        console.log(err)
      }
    } else {
      try {
        const update =await meetsApi.editMeetPost(thunderPostId, newMeet);
        alert("게시글이 수정되었습니다!")
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  }

  const {mutate:onAdd} = useMutation(onSubmitMeet, {
    onSuccess: () => {
      navigate(`/meets`);
      return queryClient.invalidateQueries([queryKeys.meets])
    },
    onError: (err) => {
      console.log(err.respose);
    }
  })


  const onSubmit = async(formData) => {
        
    let getThumbnailUrl;

    if (formData.thumbnailUrl.length > 0) {
     
      const uploaded_file = await uploadBytes(
        ref(storage, `images/meet/${formData.thumbnailUrl[0].name}`),
        formData.thumbnailUrl[0],
      )
      getThumbnailUrl = await getDownloadURL(uploaded_file.ref);
    } else if (thunderPostId) {
      getThumbnailUrl = imgSrc;
    } else {
      getThumbnailUrl = '';
    }


    const newMeet = { 
      ...formData,
      thumbnailUrl: getThumbnailUrl 
    }
     
    onAdd(newMeet)
  };
  
  




  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>제목</p>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="제목을 입력해주세요"
          {...register("title", {
            required: "제목을 입력해주세요"
          })}
        />
      </div>
      <ImageLabel>
        <p>썸네일</p>
         <div className= "imgBox">
          {imgSrc ? <img src={imgSrc} alt="thumbnail"/> : <div className="noneImg" />}
            <div className="buttonDiv">
            <input
            type="file"
            accept="image/*"
            name="thumbnailUrl"
            {...register("thumbnailUrl", {
            onChange: (e) => previewImage(e)
          })}
            id="img_input"
            />
            <label className="uploadBtn" htmlFor="img_input">첨부</label>
            </div>
         </div>
      </ImageLabel>
      <div>
        <p>지역</p>
        <select name="area" id="area" {...register("area", {
            required: "지역을 입력해주세요"
          })}>
          <option value="서울·경기·인천">서울·경기·인천</option>
          <option value="강원">강원</option>
          <option value="대구·경북">대구·경북</option>
          <option value="부산·울산·경남">부산·울산·경남</option>
          <option value="전북">전북</option>
          <option value="광주·전남">광주·전남</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="제주">제주</option>
        </select>
      </div>
      <div>
        <p>위치 정보</p>
        <input type="text" name="address" {...register("address", {
            required: "주소를 입력해주세요"
          })}/>
      </div>
      <div>
        <p>모집 인원</p>
        <input
          type="number"
          name="goalMember"
          {...register("goalMember", {
            required: "모집 인원을 입력해주세요"
          })}
        />
      </div>
      <div className="dateBox">
        <p>종료일</p>
        <input 
          type="date" name="endDate" 
          min={new Date().toISOString().split('T')[0]}
          {...register("endDate", {
            required: "종료일을 입력해주세요"
          })}/>
      </div>

      <div>
        <p>모임일</p>
        <input
          type="date"
          name="meetDate"
          min={new Date().toISOString().split('T')[0]}
          {...register("meetDate", {
            required: "모임일을 입력해주세요"
          })}
        />
      </div>
      <div>
        <p>모임 상세 내용</p>
        <textarea
          className="textArea"
          name="content"
          id=""
          cols="30"
          rows="10"
          {...register("content", {
            required: "상세 내용을 입력해주세요"
          })}
        />
      </div>
        <button type="submit" disabled={!isValid}>
            모임 { thunderPostId? "수정" : "등록"} 하기
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0;
  form{
    & > button {
      height: 2.5625rem;
      width: 100%;
      border-radius: 0.3125rem;
      border: none;
      cursor: pointer;
      padding: 0.75rem, 0.625rem, 0.75rem, 0.625rem;
      background-color: #007AFF;
      color: #FFFFFF;
  }
   & > button:disabled{
      height: 2.5625rem;
      width: 100%;
      border-radius: 0.3125rem;
      border: none;
      padding: 0.75rem, 0.625rem, 0.75rem, 0.625rem;
      background-color: #E5E5EA;
      color: #FFFFFF;
    }
  
  & > div {
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
    input {
      padding: 12px 10px;
      gap: 16px;

      background: #ffffff;
      border: 1px solid #d1d1d6;
      border-radius: 5px;

      font-style: normal;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.063rem;
      /* identical to box height */
    }
    select {
      padding: 0.75rem 0.625rem;
      background: #ffffff;
      border: 1px solid #d1d1d6;
      border-radius: 5px;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.063rem;
      outline: none;
    }
  }

 
  .textArea {
    padding: 0.75rem 0.625rem;
    resize: none;
    background: #ffffff;
    border: 1px solid #d1d1d6;
    border-radius: 5px;
    font-weight: 400;
    outline: none;
  }
  }
`;

const ImageLabel = styled.div`
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 0;
  
  .imgBox{
    display: flex;
    
    img{
    width: 6rem;
    height: 5rem;
    background-color: transparent;
    border-radius: 0.5rem;
    border:none;
  }
  .noneImg{
    width: 6rem;
    background-color:  #D9D9D9;
    border-radius: 0.5rem;
    border: 0.0625rem solid  #D9D9D9;
  }
    .buttonDiv{
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;

    width: 100%;
    input{
      width: 100%;
    }
    input::-webkit-file-upload-button{
    display: none;
    }
    .uploadBtn{
      background-color: #EFF7FF;
      margin-top: 0.75rem;
      height: 2rem;
      width: 4.25rem;
      border-radius: 0.25rem;
      border: none;
      text-align: center;
      padding-top: 0.5rem;
    }
  }
  }
 
`

export default MeetAdd;
