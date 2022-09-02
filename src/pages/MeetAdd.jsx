import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAddMeet } from '../react-query/hooks/useAddMeet';
import { HiOutlinePhotograph } from "react-icons/hi";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MeetAdd = () => {
  const navigate = useNavigate();

  const fileInput = React.useRef();

  const { state } = useLocation(); // navgiation으로 전달받음
  const [isEdit, setIsEdit] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const onAdd = useAddMeet();

  const [isInputValue, setIsInputValue] = useState({
    title: '',
    content: '',
    area: '서울·경기·인천',
    address: '',
    goalMember: '',
    thumbnailUrl: '',
    endDate: '',
    meetDate: ''
  });

  useEffect(() => {
    if (state) {
      // 기존의 post가 있다면
      const endDate = state.endDate.replaceAll('.', '-');
      const meetDate = state.meetDate.replaceAll('.', '-');
      const editedState = { ...state, endDate, meetDate };

      console.log(editedState, 'eiditedState, 확인해보자');

      setIsInputValue(editedState);
      setIsEdit(true); // edit 체크
    }
  }, []);

  const {
    thunderPostId,
    title,
    content,
    area,
    address,
    goalMember,
    thumbnailUrl,
    endDate,
    meetDate
  } = isInputValue;

  
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

  const onChange = (e) => {
    setIsInputValue({
      ...isInputValue,
      [e.target.name]: e.target.value
    });
  };

 const onPostData = async() => {
  console.log(fileInput.current.files[0], '체크체크')
  let uploadUrl;
  if(fileInput.current?.files.length>0){
    
      const uploaded_file = await uploadBytes(
          ref(storage, `images/meet/${ 
            fileInput.current?.files[0].name}`)
         ,fileInput.current?.files[0]
        )
        uploadUrl = await getDownloadURL(uploaded_file.ref);
      } else if (thunderPostId) {
        uploadUrl = imgSrc;
      } else {
        uploadUrl = '';
      }

      console.log(uploadUrl, 'uploadUrl')

  const post = {
    title,
    content,
    area,
    address,
    goalMember,
    thumbnailUrl : uploadUrl,
    endDate,
    meetDate
  };

  const result = window.confirm('등록하시겠습니까?');
  if (result) {
           
        console.log(post,'post!!')
    const state = { isEdit, post, thunderPostId };
    onAdd(state);
  }

 
 }

  return (
    <Container>
      <div>
        <p>제목</p>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          onChange={onChange}
          value={title}
        />
      </div>
      <ImageLabel>
        <p>썸네일</p>
         <div className= "imgBox">
          {imgSrc ? <img src={imgSrc} alt="thumbnail"/> : <div className="noneImg" />}
            <div className="buttonDiv">
            <input
            type="file"
            name="thumbnailUrl"
            onChange={previewImage}
            ref={fileInput}
            id="img_input"
            />
            <label className="uploadBtn" htmlFor="img_input">첨부</label>
            </div>
         </div>
      </ImageLabel>
      <div>
        <p>지역</p>
        <select name="area" id="area" onChange={onChange} value={area}>
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
        <input type="text" name="address" onChange={onChange} value={address} />
      </div>
      <div>
        <p>모집 인원</p>
        <input
          type="number"
          name="goalMember"
          onChange={onChange}
          value={goalMember}
        />
      </div>
      <div>
        <p>종료일</p>
        <input type="date" name="endDate" onChange={onChange} value={endDate} />
      </div>
      <div>
        <p>모임일</p>
        <input
          type="date"
          name="meetDate"
          onChange={onChange}
          value={meetDate}
        />
      </div>

      <div>
        <p>모임 상세 내용</p>
        <textarea
          onChange={onChange}
          className="textArea"
          name="content"
          id=""
          cols="30"
          rows="10"
          value={content}
        />
      </div>
      <button
        onClick={
       
          onPostData
        
        }
      >
        게시하기
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0;
  & > button {
    padding: 12px 10px;
    gap: 16px;
    background: linear-gradient(0deg, #007aff, #007aff), #ffffff;
    border-radius: 5px;
    color: #ffffff;
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
